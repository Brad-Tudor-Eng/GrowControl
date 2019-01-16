var     amqp    = require('amqplib/callback_api');
const   uuid    = require('uuidv4')
const   fs      = require('fs');

require('dotenv').config(); 

// -------------------------Arduino board-------------------------------------//

const SerialPort = require('serialport'); 
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('/dev/ttyUSB0'); 
const parser = port.pipe(new Readline({delimiter: '\r\n'})); //Read the line only when new line comes.

// ----------------------Raspberry PI Code-------------------------------------//
// ---------------------------------------------------------------------------//

//SERVER STARTUP CODE

//read the settings from the settings.JSON file
var device_settings = fs.readFileSync(__dirname + '/settings.json', { encoding: 'utf8' });

//if the settings.JSON file is empty reset the default settings
if(device_settings === "{}"){
		device_settings = fs.readFileSync(__dirname + '/settings.default.json', { encoding: 'utf8' });
		fs.writeFile(__dirname + '/settings.json',device_settings,(err)=>{ if (err) throw err; });
	}

//extract the deviceID, dev_name, settings
let { deviceID, dev_name, settings }  = JSON.parse(device_settings)
console.log(`---------------------Raspberry PI Service has started------------------------`)
console.log(`Device Name: ${dev_name}`);


//----------------------Stream Records to Server-------------------------------//
//this code is triggered when the raspberry pi receives data from the arduino board
parser.on('data', function (data) {
    
    //read the settings from the JSON file
    let device_settings = fs.readFileSync(__dirname + '/settings.json', { encoding: 'utf8' });
    let { deviceID, dev_name, settings }  = JSON.parse(device_settings);
    let device = {deviceID, dev_name, settings, data}

    //convert the device to a buffer
    let message = new Buffer.from(JSON.stringify(device))

//Send data to amqp connection

    amqp.connect(process.env.AMQP_URI, function(err, connection) {
        connection.createChannel(function(err, ch) {
            ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = uuid();
            //create a response channel to receive the new device settings
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId == corr) {
                    console.log(msg.content.toJSON());
                    let newSettings = JSON.parse(msg.content.toJSON())
                    //update the settings in the JSON file
                    fs.writeFile(__dirname + '/settings.json',msg.content.toJSON(),(err)=>{ if (err) throw err; });
                    //close the connection
                    setTimeout(function() { connection.close(); process.exit(0) }, 500);
                }
            }, {noAck: true});

            //send the message to the Queue
            ch.sendToQueue(process.env.QUEUE_NAME, message , { correlationId: corr, replyTo: q.queue });
            });//
        });//end of createChannel
    });//end of amqp connect
});//end of parser

// TODO: Add functions for controlling outputs
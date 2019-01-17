// -------------------------Arduino board-------------------------------------//
const SerialPort = require('serialport'); 
const Readline = SerialPort.parsers.Readline;
//connection port for arduino
const port = new SerialPort('/dev/ttyUSB0'); 
const parser = port.pipe(new Readline({delimiter: '\r\n'})); //Read the line only when new line comes.

// ----------------------Raspberry PI Code-------------------------------------//
// ---------------------------------------------------------------------------//

const   moment           = require('moment')
const   fs               = require('fs');

const { sendData }       = require('./sendData')
const { controlDevices } = require('./controlDevices')

require('dotenv').config(); 

//SERVER STARTUP CODE

//read the settings from the settings.JSON file
var device_settings = fs.readFileSync(__dirname + '/settings.json', { encoding: 'utf8' });

//if the settings.JSON file is empty reset the default settings
if(device_settings === "{}"){
		device_settings = fs.readFileSync(__dirname + '/settings.default.json', { encoding: 'utf8' });
		fs.writeFile(__dirname + '/settings.json',device_settings,(err)=>{ if (err) throw err; });
	}

// Print the device name to the console
let {dev_name }  = JSON.parse(device_settings)
console.log(`---------------------Raspberry PI Service has started------------------------`)
console.log( moment().format('hh:mm:ss'))
console.log(`Device Name: ${dev_name}`);

//----------------------Stream Records to Server-------------------------------//
//this code is triggered when the raspberry pi receives data from the arduino board
parser.on('data', function (ArduinoData) {
    
    //read the settings from the JSON file
    let device_settings = fs.readFileSync(__dirname + '/settings.json', { encoding: 'utf8' });
    let device = JSON.parse(device_settings);
   
    //device        = { dev_name, user, settings, deviceId }
    //ArduinoData   = { light: Number, temp: Number, humidity: Number, moisture: Number }
   
    //get the current time
    let time = moment().format('HH:mm:ss')
    //add the time to the data from the arduino board
    const data = {time, ...ArduinoData}
    //convert the data and device settings to a buffer to be sent to the server
    let message = new Buffer.from(JSON.stringify({...device, data}))

//Send data to amqp connection
    sendData(message)
//Process data to change Raspberry Pi controls    
    controlDevices(ArduinoData)
});//end of parser

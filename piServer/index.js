

// -------------------------Arduino board-------------------------------------//

const SerialPort = require('serialport'); 
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('COM3'); 
const parser = port.pipe(new Readline({delimiter: '\r\n'})); //Read the line only when new line comes.

// --------------Read Settings Saved In Local File----------------------------//

const fs = require('fs');

// //Read initial settings
var device_settings = fs.readFileSync(__dirname + '/settings.json', { encoding: 'utf8' });

// if settings file has been cleared out update the settings from default .json
if(device_settings === "{}"){
		device_settings = fs.readFileSync(__dirname + '/settings.default.json', { encoding: 'utf8' });
		fs.writeFile(__dirname + '/settings.json',device_settings,(err)=>{ if (err) throw err; });
    }
    
// ----------Read Data from Arduino and Stream to Message Broker---------------//
//setup listener for serial port

    parser.on('data', data=>{
        //data is JSON data for the arduino board.
        //ex:  "{"light": 123, "temp": 123, "humidity": 123, "moisture": 123}"

        console.log(data)
    })

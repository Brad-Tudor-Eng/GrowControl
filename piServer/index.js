// -------------------------Arduino board-------------------------------------//
const SerialPort = require('serialport'); 
const Readline = SerialPort.parsers.Readline;
//connection port for arduino
const port = new SerialPort('/dev/ttyUSB0'); 
const parser = port.pipe(new Readline({delimiter: '\r\n'})); //Read the line only when new line comes.

// ----------------------Raspberry PI Code-------------------------------------//
// ---------------------------------------------------------------------------//



const   moment          = require('moment')
const   fs              = require('fs');
const   { sendData }    = require('./sendData')
const   { startup }     = require('./startup')        
const { controlDevices } = require('./controlDevices')

require('dotenv').config(); 

//get settings for the device
startup()

//----------------------Stream Records to Server-------------------------------//

let dataArray = []

                //this code is triggered when the raspberry pi receives data from the arduino board
parser.on('data', function (ArduinoData) {
         let t1 = moment()
            //read the settings from the JSON file
            let device_settings = fs.readFileSync(__dirname + '/settings.json', { encoding: 'utf8' });
            let device = JSON.parse(device_settings);
        
            //device        = { dev_name, user, settings, deviceId }
            //ArduinoData   = { light: Number, temp: Number, humidity: Number, moisture: Number }
            
            //convert the data to a javascript object

	   	const d = JSON.parse(ArduinoData);

            dataArray.push( d )

            if(dataArray.length >= 10){
                //average out the data
                const data = processData({ dataArray })
                //convert the data and device settings to a buffer to be sent to the server
                let message = new Buffer.from(JSON.stringify({...device, data}), JSON)
                //send the message to the server
                sendData(message)
                dataArray = []
            }     


            //Process data to change Raspberry Pi controls    
            controlDevices({data: d, settings: device.settings}) 

            let t2 = moment()
            console.log(`total time: ${t2-t1}`)
});//end of parser

const processData = ( {dataArray} ) => {
let lightA = []
let tempA = []
let humidityA = []
let moistureA = []

    dataArray.forEach(({light, temp, humidity, moisture})=>{
	lightA.push(light)
	tempA.push(temp)
	humidityA.push(humidity)
	moistureA.push(moisture)
    })

    lightAvg = reduceArry(lightA)
    tempAvg = reduceArry(tempA)
    humidityAvg = reduceArry(humidityA)
    moistureAvg = reduceArry(moistureA)
    //get the current time and date
    let time = moment().format('HH:mm:ss')
    let today = moment().format('MM/DD/YYYY')

    return {today, time, light: lightAvg, temp: tempAvg, humidity: humidityAvg, moisture: moistureAvg}

}

const reduceArry = (arry) => {

let maxmin = {max: null, min: null}

arry.forEach((el)=>{

	if(maxmin["max"] === null){ maxmin["max"]=arry[0] }
	if(maxmin["min"] === null){ maxmin["min"]=arry[0] }
	
	if(el > maxmin["max"]){maxmin["max"] = el}
	if(el < maxmin["min"]){maxmin["min"] = el}
})

let final = arry.reduce((col, el) => col + el, 0)
final = (final - maxmin["max"] - maxmin["min"])/(arry.length - 2)


return Math.round(final)
}


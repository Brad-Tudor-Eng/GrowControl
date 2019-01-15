

// -------------------------Arduino board-------------------------------------//

const SerialPort = require('serialport'); 
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('COM3'); 
const parser = port.pipe(new Readline({delimiter: '\r\n'})); //Read the line only when new line comes.

// ----------------------Express Server Starts Here-----------------------------//

parser.on('data', data=>{
    console.log(data)
})


// const app = require('express')();
// const bodyParser = require('body-parser');
// const axios = require('axios');
// const cors = require('cors');
// const https = require('https');
// const fs = require('fs');
// const url = "https://growctrl.herokuapp.com"
// const localurl = "http://192.168.1.31:3000"
// const staticURL = localurl;

// const PORT = process.env.PORT || 8000;


// //Read initial settings
// var device_settings = fs.readFileSync(__dirname + '/settings.json', { encoding: 'utf8' });

// if(device_settings === "{}"){
// 		device_settings = fs.readFileSync(__dirname + '/settings.default.json', { encoding: 'utf8' });
// 		fs.writeFile(__dirname + '/settings.json',device_settings,(err)=>{ if (err) throw err; });
// 	}


// let { deviceID, dev_name, settings }  = JSON.parse(device_settings)
//  console.log(dev_name);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(cors());


// //----------------------ROUTES-------------------------------//
// //retrieve name and settings
// app.get('/piHouse/:devname',(req,res)=>{
//     if(req.params.devname === dev_name){
//         responseObject = { dev_name, settings }
//         res.send(JSON.stringify(responseObject));
//     }
// });

// app.post('/',(req,res)=>{
// console.log(req.body);
// res.status(200).send(req.body.url);
// });

// //change settings
// app.post('/piHouse/:devname',(req,res)=>{
//     if(req.params.devname === dev_name){
//         dev_name = req.body.dev_name;
//         settings = req.body.settings;
//         deviceID = req.body.deviceID;
        
//         device_settings = {
//             dev_name,
//             settings,
//             deviceID
//         }

//         fs.writeFile(__dirname + '/settings.json',JSON.stringify(device_settings),(err)=>{ if (err) throw err; });
//         responseObject = { dev_name, settings }
//         res.status(200).send(JSON.stringify(responseObject));
//     }
// });

// //----------------------Stream Records to Server-------------------------------//
// parser.on('data', function (data) {
//     console.log('Sending data:', data);
//     //send record data
//     //send deviceID
//     let device_settings = fs.readFileSync(__dirname + '/settings.json', { encoding: 'utf8' });
//     let { deviceID, dev_name, settings }  = JSON.parse(device_settings);

//     axios.post(`${staticURL}/api/${deviceID}`,{
//         deviceID,
// 	dev_name,
// 	settings,
// 	data
//     }).then((result) => {
	
// 	deviceID = result.data._id
// 	dev_name = result.data.dev_name
// 	settings = result.data.settings	
	
//         device_settings = {
//             dev_name,
//             settings,
//             deviceID
//         }

// 	console.log(device_settings)

// 	if(dev_name !== undefined || settings !== undefined){
//         	fs.writeFile(__dirname + '/settings.json',JSON.stringify(device_settings),(err)=>{ if (err) throw err; });
//         }else{
// 		device_settings = fs.readFileSync(__dirname + '/settings.default.json', { encoding: 'utf8' });
// 		fs.writeFile(__dirname + '/settings.json',device_settings,(err)=>{ if (err) throw err; });
// 	}

// 	} ).catch((err) => { console.log(err)});

//   });

// app.listen(PORT, ()=>{
//     console.log('pi server running')
// })
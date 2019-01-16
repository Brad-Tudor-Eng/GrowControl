var   amqp          = require('amqplib/callback_api')
const mongoose      = require('mongoose')
const moment        = require('moment')
const axios         = require('axios')
const { ObjectId }  = require('mongodb')

var   Device        = require('./models/Device')
                      require('dotenv').config()


//setup Mongoose connectino
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
mongoose.connection.once('open', ()=>{
  console.log(' [x] database connected')
})


//setup the amqp message broker
amqp.connect(process.env.AMQP_URI, (error, connection)=>{

  //create a new channel to receive information on
    connection.createChannel((error, ch)=>{
        //create a bulk data queue to receive information on
          ch.assertQueue(process.env.QUEUE_NAME,{durable: true})
          console.log(' [x] Awaiting RPC requests');
          //read the messages from the queue
          ch.consume(process.env.QUEUE_NAME,(message)=>{
            //determine who to reply to
            let {correlationId, replyTo} = message.properties
            //extract the data from the message
            let JSONdata = JSON.parse(message.content.toJSON())
            //process the measruement data
            let deviceSettings = processMessage(JSONdata)
            //respond to the raspberry pi with the device settings
            ch.sendToQueue(replyTo,  deviceSettings,  { correlationId } );
            //acknowledge the message
            ch.ack(message)
          }) //end of consume
    })//end of channel creation
})//end of amqp connection


/*---------------------------------------------------------------------------------------------------------------------*/
//process the message data and return the device settings
const processMessage = async (dev) => {
  const {dev_name, data} = dev
  /* dev = 
    deviceID: is a MongoDB object ID
    devName:  is a string specified by the user
    settings: { light: { average: Number, tol: Number}, 
                temp: { average: Number, tol: Number }, 
                humidity: { average: Number, tol: Number }, 
                moisture: { average: Number, tol: Number }
              }
    records:  [ {time: hh:mm:ss, light: Number, temp: Number, humidity: Number, moisture; Number} ]
  */

  const today = moment().format('DD/MM/YYYY');
  const device = await Device.findOne({dev_name: ObjectId(dev_name) })

  //check to see if the device was found
  if(device !== null){
    //check to see if there is a record with todays date
    const index = device.records.findIndex(({ date })=> date === today);
    //if there is no record with todays date add a new record.
    //if there is a record with todays date add data to that record
    index === -1 ? addNewRecord(device, today, data) : addDataToRecord(device, index, data)
    //return device settings as buffer to send back to receiver
    const newSettings = JSON.stringify( { "deviceID": device.deviceID, "dev_name": device.dev_name, "settings": device.settings })
    //return the new settings
    return new Buffer.from(JSON.stringify(newSettings))
  }
}


/*---------------------------------------------------------------------------------------------------------------------*/
//method for adding a new record
const addNewRecord = async (device, date, data) => {
  //data {time: hh:mm:ss, light: Number, temp: Number, humidity: Number, moisture; Number}
  let newRecord = { date, data:[data] }

  //send data with axios to api server to be relayed to publish subscription to front end

      device.records.push(newRecord);  
      await device.updateOne(device)
}


/*---------------------------------------------------------------------------------------------------------------------*/
//method for adding data to a record
const addDataToRecord = async (device, index, data) => {
  //send data with axios to api server to be relayed to publish subscription to front end
  
  device.records[index].data.push(data);
    try {
      await device.updateOne(device);
    } catch (error) {
      console.log(error)
    }                
}

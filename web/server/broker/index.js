import  amqp          from 'amqplib/callback_api'
import  moment        from 'moment'
import  { ObjectId }  from 'mongodb'
import  Device        from '../models/Device'
import  { pubsub }    from '../../index'

require('dotenv').config()

//setup the amqp message broker
amqp.connect(process.env.AMQP_URI, (error, connection)=>{
  //create a new channel to receive information on
    connection.createChannel((error, ch)=>{
        //create a bulk data queue to receive information on
          ch.assertQueue(process.env.QUEUE_NAME,{durable: true})
          console.log(`[x] Awaiting RPC requests on channel: ${process.env.QUEUE_NAME}`);
          //read the messages from the queue
          ch.consume(process.env.QUEUE_NAME,(message)=>{
            //determine who to reply to
            let {correlationId, replyTo} = message.properties
            //extract the data from the message
            //deviceID must be entered into the device before setting up
              let JSONdata = JSON.parse(message.content.toString())
            //process the measruement data
              processMessage(JSONdata, ch, replyTo, correlationId)
              ch.ack(message)
          }) //end of consume
    })//end of channel creation
})//end of amqp connection

/*---------------------------------------------------------------------------------------------------------------------*/

//process the message data and return the device settings
const processMessage = async (JSONdata,  ch, replyTo, correlationId) => {

  const { deviceId: id, data } = JSONdata

  /*
    id:         is a MongoDB object ID 
    dev_name:   is a string specified by the user,
    user:       is a MongoDB object ID connecting the device to the user
    settings:   { light: { average: Number, tol: Number}, 
                  temp: { average: Number, tol: Number }, 
                  humidity: { average: Number, tol: Number }, 
                  moisture: { average: Number, tol: Number }
                }
    records:    [ {time: HH:mm:ss, light: Number, temp: Number, humidity: Number, moisture: Number} ]
    pubsub channel = `data-${today}-${userId}-${deviceId}`
  */

  const today = moment().format('DD/MM/YYYY');
  const device = await Device.findById(ObjectId(id))

  const user = device.user    
 
  if(user){ pubsub.publish(`data-${today}-${user}-${id}`, { data: data }) }
  //check to see if the device was found
  if(device !== null){
    //check to see if there is a record with todays date
    const index = device.records.findIndex(({ date })=> date === today);
    //if there is no record with todays date add a new record.
    //if there is a record with todays date add data to that record

    index === -1 ? addNewRecord(device, today, data) : addDataToRecord(device, index, data)
    //return device settings as buffer to send back to receiver
    const {dev_name, settings} = device
    const newSettings = JSON.stringify( { "deviceId": id, dev_name, settings })
    //return the new settings
    const msg = new Buffer.from(JSON.stringify(newSettings), JSON)
    ch.sendToQueue(replyTo,  msg,  { correlationId } );
    
  }
}


/*---------------------------------------------------------------------------------------------------------------------*/
//method for adding a new record
const addNewRecord = async (device, date, data) => {
  //data {time: hh:mm:ss, light: Number, temp: Number, humidity: Number, moisture; Number}
  let newRecord = { date, data:[data] }
      device.records.push(newRecord)
      await device.updateOne(device)
}


/*---------------------------------------------------------------------------------------------------------------------*/
//method for adding data to a record
const addDataToRecord = async (device, index, data) => {
  
  device.records[index].data.push(data);
    try {
      await device.updateOne(device);
    } catch (error) {
      console.log(error)
    }                
}


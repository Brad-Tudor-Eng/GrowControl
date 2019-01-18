const   fs      = require('fs');
const   amqp    = require('amqplib/callback_api');
const   uuid    = require('uuidv4')

const sendData = async ( message ) => {


    amqp.connect(process.env.AMQP_URI, function(err, connection) {
        connection.createChannel(function(err, ch) {
            ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = uuid();

            //send the message to the server
            ch.sendToQueue(process.env.QUEUE_NAME, message , { correlationId: corr, replyTo: q.queue });

            //create a response channel to receive the new device settings
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId == corr) {
                    //convert the messge content from buffer to JSON
                    let JSONmsg = JSON.parse(msg.content.toString())
                    //update the settings in the JSON file
                        fs.writeFile(__dirname + '/settings.json',JSONmsg,(err)=>{ if (err) throw err; });
                    //close the connection
                        connection.close();
                }
            }, {noAck: true});
            });//
        });//end of createChannel
    });//end of amqp connect
}//end of send data


module.exports = {
    sendData
}
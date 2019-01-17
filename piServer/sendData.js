const   amqp    = require('amqplib/callback_api');
const   uuid    = require('uuidv4')

const sendData = (message) =>{
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
                    JSONmsg = msg.content.toJSON();
                    console.log(JSONmsg);
                    //update the settings in the JSON file
                    fs.writeFile(__dirname + '/settings.json',JSONmsg,(err)=>{ if (err) throw err; });
                    //close the connection
                    setTimeout(function() { connection.close(); process.exit(0) }, 500);
                }
            }, {noAck: true});

            });//
        });//end of createChannel
    });//end of amqp connect
}

module.exports = {
    sendData
}
const moment = require('moment');


const Subscription = {
    records: {
        subscribe(parent, args, { pubsub }, info) {
        //notify the user when a new record has been created
        //subscription channel will be made of user id and device id

            return pubsub.asyncIterator('records')
        }
    },

    data:{
        subscribe(parent, args, { pubsub }, info) {
         const today = moment().format('DD/MM/YYYY')
        //notify user when data has been added to a record
        //subscription channel will be made of user id, device id, and
        //current date 
            return pubsub.asyncIterator('data')
        }
    }
}

export default Subscription
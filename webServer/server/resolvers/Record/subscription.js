const moment = require('moment');

// stream new data to user      []

export const data ={
    subscribe(parent, args, { pubsub }, info) {
        const today = moment().format('DD/MM/YYYY')
    //subscription channel = user id, device id, andcurrent date 
        return pubsub.asyncIterator('data')
    }
}



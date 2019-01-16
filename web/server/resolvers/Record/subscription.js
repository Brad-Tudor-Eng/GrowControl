const moment = require('moment');

// stream new data to user      []

export const data ={
    
    subscribe(parent, { data }, { pubsub }, info) {
        const { userId , deviceId } = data
        const today = moment().format('DD/MM/YYYY')
    //subscription channel = user id, device id, andcurrent date 
        return pubsub.asyncIterator(`data-${today}-${userId}-${deviceId}`)
    }
}



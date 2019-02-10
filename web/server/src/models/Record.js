const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const recordSchema = new Schema({
    date: { type: String, default: moment().format('DD/MM/YYYY') },
    data: [{
            time: {type: String, default: moment().format('HH:mm:ss')},
            light:{ type: Number, default: 0}, 
            temp: { type: Number, default: 0}, 
            humidity: { type: Number, default: 0}, 
            moisture: { type: Number, default: 0}
        }]

});

module.exports = recordSchema
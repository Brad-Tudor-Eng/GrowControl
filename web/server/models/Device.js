const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recordSchema = require('./Record');

const deviceSchema = new Schema({
    dev_name: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    settings: { light: { average: Number, tol: Number}, 
                temp: { average: Number, tol: Number }, 
                humidity: { average: Number, tol: Number }, 
                moisture: { average: Number, tol: Number }
              },
     records: [ recordSchema ]
});

const Device = mongoose.model('device', deviceSchema);

module.exports =  Device 
const { inRange } = require('./inRange')
const { setControlPinState } = require('./setControlPinState')

const controlDevices = (data, settings) => {
    //data:     { light: Number, temp: Number, humidity: Number, moisture: Number }
    //settings: { light: {average, tol}, temp: {average, tol}, humidity: {average, tol}, moisture: {average, tol} }
    let test

    const controlPins = {
        light: 14,
        temp: 13,
        humidity: 12,
        moisture: 13
    }

    //call in range for each item in data
    for(let key in data){
        if ( data.hasOwnProperty(key) ){
            test = inRange(data[key], settings[key])
            setControlPinState(test, controlPins)
        }
    }
}


module.exports = {
    controlDevices
}
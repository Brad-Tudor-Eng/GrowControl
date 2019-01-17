const { inRange } = require('./inRange')
const { setControlPinState } = require('./setControlPinState')

const controlDevices = (data, settings) => {
    //data:     { light: Number, temp: Number, humidity: Number, moisture: Number }
    //settings: { light: {average, tol}, temp: {average, tol}, humidity: {average, tol}, moisture: {average, tol} }
    
    //check to see if the measured values are in the tolerance range of the settings
    //then adjust the control pins accordingly
    for(let key in data){
        if ( data.hasOwnProperty(key) ){   
            setControlPinState( inRange(data[key], settings[key]) , key )
        }
    }

}


module.exports = {
    controlDevices
}
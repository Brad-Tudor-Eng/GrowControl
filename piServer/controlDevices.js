const { inRange } = require('./inRange')
const { setControlPinState } = require('./setControlPinState')

const controlDevices = ({data, settings}) => {
    //data:     { light: Number, temp: Number, humidity: Number, moisture: Number }
    //settings: { light: {average, tol}, temp: {average, tol}, humidity: {average, tol}, moisture: {average, tol} }
    
    //check to see if the measured values are in the tolerance range of the settings
    //then adjust the control pins accordingly
    for(let key in data){
        if ( data.hasOwnProperty(key) ){
	let test = inRange(data[key], settings[key])
            setControlPinState( test , key )
        }
    }

}


module.exports = {
    controlDevices
}
const { setControlPinState } = require('./setControlPinState')

const controlDevices = ({data, settings}) => {
    //data:     { light: Number, temp: Number, humidity: Number, moisture: Number }
    //settings: { light: {average, tol}, temp: {average, tol}, humidity: {average, tol}, moisture: {average, tol} }
    
    for(let key in data){
        if ( data.hasOwnProperty(key) ){
            setControlPinState( {data:data[key], settings:settings[key], key} )
        }
    }

}


module.exports = {
    controlDevices
}
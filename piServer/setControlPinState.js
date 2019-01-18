const   Gpio    = require('onoff').Gpio

const controlPins = {
    light: 37,
    temp: 35,
    humidity: 33,
    moisture: 31
}

const setControlPinState = (test, key) =>{
    console.log('setting state of the GPIO pins')
    const state = test ? 1 : 0;

            let control = new Gpio(controlPins[key],'out')
            // check the current state of the pin
            const currentState = control.readSync()
            // if the current state doesn't match the test change it.
            if(currentState != state){
                control.writeSync(state)
            }
            // release the control
            control.unexport()
            
}

module.exports = {
    setControlPinState
}
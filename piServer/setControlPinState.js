const   Gpio    = require('onoff').Gpio

const controlPins = {
    light: 23,
    temp: 22,
    humidity: 12,
    moisture: 20
}

const setControlPinState = (test, key) =>{

    const state = test ? 1 : 0;



            let control = new Gpio(controlPins[key],'out')
            // check the current state of the pin
            const currentState = control.readSync()
            // if the current state doesn't match the test change it.
            if(currentState != state){
                control.writeSync(state)
            }

            
}

module.exports = {
    setControlPinState
}
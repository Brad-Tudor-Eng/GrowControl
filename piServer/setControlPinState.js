const   Gpio    = require('onoff').Gpio

const setControlPinState = (test, controlPins) =>{
    const state = test ? 1 : 0;

    for (let key in controlPins){
        if( controlPins.hasOwnProperty(key) ){
            // setup a new GPIO control
            let control = new Gpio(key, controlPins[key])
            // check the current state of the pin
            const currentState = control.readSync()
            // if the current state doesn't match the test change it.
            if(currentState != state){
                control.writeSync(state)
            }
            // release the control
            control.unexport()
        }
    }
}

module.exports = {
    setControlPinState
}
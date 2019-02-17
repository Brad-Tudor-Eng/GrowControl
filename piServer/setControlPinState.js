const   Gpio    = require('onoff').Gpio
const { inRange } = require('./inRange')

const controlPins = {
    light: 23,
    temp: 22,
    humidity: 12,
    moisture: 20
}

const setControlPinState = ({data, settings, key}) =>{

    //solinoids are wired with a normally close state
    //false indicates that the sensor is ON
    const ctrl = { on: 0, off: 1, }

            let control = new Gpio(controlPins[key],'out')
            // check the current state of the pin
            const currentState = control.readSync()
            // test to see what the pin state should be.
            const test = inRange({currentState, data, settings, key})
            const state = test ? ctrl.off : ctrl.on;
            if(currentState !== state){
                control.writeSync(state)
            }

            
}

module.exports = {
    setControlPinState
}
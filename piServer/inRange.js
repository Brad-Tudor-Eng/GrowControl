const moment = require('moment')

const daylightHours = 12
const sunRise = 7
const sunSet = sunRise + daylightHours

const inRange = ({currentState, data:value, settings, key}) =>{ 
    let time = parseInt( moment().format('HH') )
    //return false to turn pins on
    //return true to turn pins off
    const {average, tol} = settings

    //light
    if( key === "light" ){
        //need to add value in to average out light fall per hour
      return time < sunRise || time > sunSet ? true : false;
    }
    
    //temp, humidity, moisture
    return currentState === 0 ? 
            value >= average + tol : 
            value >= average - tol ; 

}

module.exports = {
    inRange
}
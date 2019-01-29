import React from 'react'
import Gauge from './Gauge'

//This component executes the mutation for updating
//The device settings

const Gauges = () => {

    return (
        <div className="gauges">
            <Gauge measurement="light" val={300}/>
            <Gauge measurement="temp" val={78}/>
            <Gauge measurement="humidity" val={80}/>
            <Gauge measurement="moisture" val={90}/>
        </div>
    )
}

export default Gauges
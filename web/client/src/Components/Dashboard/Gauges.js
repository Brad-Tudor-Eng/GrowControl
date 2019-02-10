import React, {useEffect} from 'react'
import Gauge from './Gauge'
import { connect } from 'react-redux'

//This component executes the mutation for updating
//The device settings

const Gauges = (props) => {

       let data = props.data || {light: 0, temp: 0, humidity: 0, moisture: 0}
 
useEffect(()=>{

},[props.data])

    return (
        <div className="gauges">
            <Gauge measurement="light" val={data.light}/>
            <Gauge measurement="temp" val={data.temp}/>
            <Gauge measurement="humidity" val={data.humidity}/>
            <Gauge measurement="moisture" val={data.moisture}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    let data = state.records.today
    return {
        data: data[data.length - 1]
    }
}

export default connect(mapStateToProps)(Gauges)
import React, {useEffect} from 'react'
import { connect } from 'react-redux'
//This component shows the last 10 readings
//live data stream



const DataTable = (props) => {

    useEffect(()=>{

    },[props.today])

    const renderBody = (data) => {

        let reversedData = []

        if(!data){
            return <h2 className="P">Not Active...</h2>
        }

        for (let i=data.length -1; i >= 0; i--) {
            reversedData.push(data[i])
        }

        return reversedData.map( measurment => {
            const {time, light, temp, humidity, moisture} = measurment

            return (
                <div 
                key={measurment.time}
                className="data dataTable_body_data">
                    <span className="data dataTable_body-time">{time}</span>
                    <span className="data dataTable_body-light">{light}</span>
                    <span className="data dataTable_body-temp">{temp}</span>
                    <span className="data dataTable_body-humidity">{humidity}</span>
                    <span className="data dataTable_body-moisture">{moisture}</span>
                </div>
            )

        })


    }

        
    

    return (
        <div className="dataTable card">
        <div className="dataTable_spacer"></div>
            <div className="dataTable_header H_secondary">Current Data</div>
            <div className="dataTable_body">
            <div className="dataTable_body_label">
                <span className="H_tertiary">Time</span>
                <span className="H_tertiary">Light</span>
                <span className="H_tertiary">Temp</span>
                <span className="H_tertiary">Humidity</span>
                <span className="H_tertiary">Moisture</span>
            </div>
                {renderBody(props.today)}
            </div>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        today: state.records.today
    }
}

export default connect(mapStateToProps,null)(DataTable)
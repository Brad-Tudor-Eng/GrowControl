import React from 'react'

//This component shows the last 10 readings
//live data stream



const DataTable = () => {

    const data = [
        { time: "15:01:06", light: 416, temp: 75, humidity: 227, moisture: 60,},
        { time: "15:02:06", light: 500, temp: 76, humidity: 227, moisture: 60,},
        { time: "15:03:06", light: 550, temp: 77, humidity: 227, moisture: 60,},
        { time: "15:04:06", light: 525, temp: 76, humidity: 227, moisture: 60,},
        { time: "15:05:06", light: 510, temp: 74, humidity: 227, moisture: 60,},
        { time: "15:06:06", light: 475, temp: 73, humidity: 227, moisture: 60,},
        { time: "15:07:06", light: 435, temp: 72, humidity: 227, moisture: 60,},
        { time: "15:08:06", light: 400, temp: 71, humidity: 227, moisture: 60,},
        { time: "15:01:06", light: 416, temp: 75, humidity: 227, moisture: 60,},
        { time: "15:10:06", light: 430, temp: 69, humidity: 227, moisture: 60,},
        { time: "15:06:06", light: 475, temp: 73, humidity: 227, moisture: 60,},
        { time: "15:07:06", light: 435, temp: 72, humidity: 227, moisture: 60,},
        { time: "15:08:06", light: 400, temp: 71, humidity: 227, moisture: 60,},
        { time: "15:01:06", light: 416, temp: 75, humidity: 227, moisture: 60,},
        { time: "15:10:06", light: 430, temp: 69, humidity: 227, moisture: 60,},
        { time: "15:06:06", light: 475, temp: 73, humidity: 227, moisture: 60,},
        { time: "15:01:06", light: 416, temp: 75, humidity: 227, moisture: 60,},
        { time: "15:02:06", light: 500, temp: 76, humidity: 227, moisture: 60,},
        { time: "15:03:06", light: 550, temp: 77, humidity: 227, moisture: 60,},
        { time: "15:04:06", light: 525, temp: 76, humidity: 227, moisture: 60,},
        { time: "15:05:06", light: 510, temp: 74, humidity: 227, moisture: 60,},
        { time: "15:06:06", light: 475, temp: 73, humidity: 227, moisture: 60,},
        { time: "15:07:06", light: 435, temp: 72, humidity: 227, moisture: 60,},
        { time: "15:08:06", light: 400, temp: 71, humidity: 227, moisture: 60,},
        { time: "15:01:06", light: 416, temp: 75, humidity: 227, moisture: 60,},
        { time: "15:10:06", light: 430, temp: 69, humidity: 227, moisture: 60,},
        { time: "15:06:06", light: 475, temp: 73, humidity: 227, moisture: 60,},
        { time: "15:07:06", light: 435, temp: 72, humidity: 227, moisture: 60,},
        { time: "15:08:06", light: 400, temp: 71, humidity: 227, moisture: 60,},
        { time: "15:01:06", light: 416, temp: 75, humidity: 227, moisture: 60,},
        { time: "15:10:06", light: 430, temp: 69, humidity: 227, moisture: 60,},
        { time: "15:06:06", light: 475, temp: 73, humidity: 227, moisture: 60,},
]

    const renderBody = (data) => {
        console.log(data)

        let reversedData = []

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
            <div className="dataTable_header H_secondary">Latest Data</div>
            <div className="dataTable_body">
            <div className="dataTable_body_label">
                <span className="H_tertiary">Time</span>
                <span className="H_tertiary">Light</span>
                <span className="H_tertiary">Temp</span>
                <span className="H_tertiary">Humidity</span>
                <span className="H_tertiary">Moisture</span>
            </div>
                {renderBody(data)}
            </div>
            
        </div>
    )
}

export default DataTable
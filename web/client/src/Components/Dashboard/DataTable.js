import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import gql from "graphql-tag";
import Cookies from 'js-cookie';
import moment from 'moment'
import actions from '../../Actions';

import { Query } from "react-apollo";
//This component shows the last 10 readings
//live data stream

//this query loads the user devices
const RECORD_ONE_DAY = gql`
query recordOneDay($data:RecordOneDayInput){
    recordOneDay(data: $data){
        date
        data{
            time
            light
            temp
            humidity
            moisture
        }
    }
}`



const DATA_SUBSCRIPTION = gql`
subscription DataSubscription($data: DataSubscriptionInput){
    data(data: $data){
      time
      light
      temp
      humidity
      moisture
    }
  }
`;


 const NewTableBody = (props) => {

    if(props.deviceId && props.userId){

        const deviceId = props.deviceId
        const userId = props.userId
        const token = Cookies.get('xAuthG')
        const date = moment().format('MM/DD/YYYY')
    
        return (
            <Query
                query={RECORD_ONE_DAY}
                variables={{data:{ deviceId, token, date }}}
            >
                {({ loading, error, data , subscribeToMore }) => { 
                    if(data){
                        if(Object.keys(data).length > 0 && data.recordOneDay !== null){
                            const {recordOneDay} = data
                            
                            return ( 
                                <RenderBody
                                    props={props} 
                                    data={recordOneDay.data} 
                                    subscribeToNewData = {()=>
                                        subscribeToMore({
                                            document: DATA_SUBSCRIPTION,
                                            variables: {data: {deviceId, token, userId}},
                                            updateQuery: (prev,  { subscriptionData }  )=>{
                                                if (!subscriptionData.data) return prev;
                                                    if(prev.recordOneDay !== null){
                                                        const { data } = subscriptionData.data
                                                            //check to see if the data has the last timestamp
                                                          let dataArray = prev.recordOneDay.data  
                                                            if(dataArray[dataArray.length-1].time !== data.time){
                                                                prev.recordOneDay.data.push(data)
                                                                props.updateRecord(data)
                                                            }
                                                    }
                                                return prev
                                                
                                            }
                                        })
                                    }
                                /> 
                            )
                        }
                        return (<h2>...None</h2>)
                    }
                }}
            </Query>)
    }else{
        return (<div>
            <br></br>
            <h2>Nothing Yet...</h2>
            <br></br>
            <h2>If a new device has been added,</h2>
            <h2>please refresh the page once the id has been</h2>
            <h2>updated on the physical device.</h2>
            </div>)
    }

}



const RenderBody = (props) => {
const data = props.data    

useEffect(()=>{
    props.subscribeToNewData()  
},[])

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

const DataTable = (props) => {


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
                {/* Render body goes here */}
                { NewTableBody(props) }

            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        deviceId: state.device.selectedDevice.id,
        userId: state.user.id
    }
}

export default connect(mapStateToProps,actions)(DataTable)



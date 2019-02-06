import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import gql from "graphql-tag";
import Cookies from 'js-cookie';
import moment from 'moment'
import actions from '../../Actions';

import { ApolloConsumer} from "react-apollo";
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


const oneDayQuery = async ({ deviceId, userId, client}) => {
    const token = Cookies.get('xAuthG')
    const date = moment().format('MM/DD/YYYY')
    const { data, subscribeToMore, error } = await client.query({
      query:RECORD_ONE_DAY,
      variables:{data: {deviceId ,token, date}},
    });


    const subscribeToNewData = ()=>
        subscribeToMore({
            document: DATA_SUBSCRIPTION,
            variables: {data: {deviceId, userId}},
            updateQuery: (prev,  { subscriptionData }  )=>{
                if (!subscriptionData.data) return prev;
                const { data } = subscriptionData.data
                const count = prev.recordOneDay.length-1
                
                prev.recordAll[count].data.push(data)
                //return a new object with the record added
                return prev
                
            }
        })
    
    let { recordOneDay } = data
    console.log(recordOneDay)
    return {data: recordOneDay, subscribeToNewData}

  }






  

const renderBody = ({client, props}) => {


    if(props.deviceId && props.userId){
        const {deviceId, userId} = props

        const [data, setData] = useState([])
        const {QueryData, subscribeToNewData} = oneDayQuery({deviceId, userId, client})
      
 
        
    }






    // useEffect(()=>{
    // let newData = subscribeToNewData()
    // props.setSelectedRecord(newData)
    // },[data])




    // let reversedData = []



    // if(!data){
    //     return <h2 className="P">Not Active...</h2>
    // }
    // for (let i=data.length -1; i >= 0; i--) {
    //     reversedData.push(data[i])
    // }
    // return reversedData.map( measurment => {
    //     const {time, light, temp, humidity, moisture} = measurment
    //     return (
    //         <div 
    //         key={measurment.time}
    //         className="data dataTable_body_data">
    //             <span className="data dataTable_body-time">{time}</span>
    //             <span className="data dataTable_body-light">{light}</span>
    //             <span className="data dataTable_body-temp">{temp}</span>
    //             <span className="data dataTable_body-humidity">{humidity}</span>
    //             <span className="data dataTable_body-moisture">{moisture}</span>
    //         </div>
    //     )
    // })

    return(<div>p</div>)

    
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
            <ApolloConsumer>
                {client => ( renderBody({client, props}) )}
            </ApolloConsumer>
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


// const renderBody = (data) => {
//     let reversedData = []
//     if(!data){
//         return <h2 className="P">Not Active...</h2>
//     }
//     for (let i=data.length -1; i >= 0; i--) {
//         reversedData.push(data[i])
//     }
//     return reversedData.map( measurment => {
//         const {time, light, temp, humidity, moisture} = measurment
//         return (
//             <div 
//             key={measurment.time}
//             className="data dataTable_body_data">
//                 <span className="data dataTable_body-time">{time}</span>
//                 <span className="data dataTable_body-light">{light}</span>
//                 <span className="data dataTable_body-temp">{temp}</span>
//                 <span className="data dataTable_body-humidity">{humidity}</span>
//                 <span className="data dataTable_body-moisture">{moisture}</span>
//             </div>
//         )
//     })
// }
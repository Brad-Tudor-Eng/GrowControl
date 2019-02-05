import React, { useEffect, useState } from 'react'
import actions from '../../Actions';

import gql from "graphql-tag";
import {  ApolloConsumer } from "react-apollo";
import Cookies from 'js-cookie';

import { connect } from 'react-redux'


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





const DateButton  = (props) => {


    const [expanded, setExpanded] = useState(null)
    const [token, setToken] = useState(null)

    const {records, selected} = props


    useEffect(()=>{
        setToken(Cookies.get('xAuthG'))
    },[expanded, records, token])

    const expand=()=>{
        expanded ? setExpanded(null) : setExpanded('expanded')
    }

    const oneDayQuery = async ({token, deviceId, date, client}) => {
        const { data } = await client.query({
          query:RECORD_ONE_DAY,
          variables:{data: {deviceId ,token, date}}
        });
        const { recordOneDay } = data
        console.log(recordOneDay)
        props.setSelectedRecord(recordOneDay)
      }

    const liClick=({e, client})=>{
        oneDayQuery({token, deviceId: props.deviceId, date: e.target.id ,client})
    }

    const renderRecords = () => {
        const recordsArray = Object.keys(records).map(key=>records[key])
        return recordsArray.map((record,i)=>
        <ApolloConsumer key={record.date}>
            {client => (
                <li id={record.date} onClick={ (e)=>{ liClick( {e ,client} )} } className="dateBtn_item" >{record.date}</li>
            )}  
        </ApolloConsumer>
        )}

    const renderCenter = () => {
        return !expanded ? (<div className="dateBtn_center" >{selected.date}<i className="fas fa-chevron-up"></i></div>) :
                            (<div className={`dateBtn_center ${expanded}`}><ul>{renderRecords()}</ul></div>)
    }
        
    return( <button onClick={ ()=>{expand()} } className="dateBtn">{ renderCenter() }</button> )

}//dend of date button 

const mapStateToProps = (state) => {
    return {
        deviceId: state.device.selectedDevice.id,
        records: state.records.all,
        selected: state.records.selected
    }
}

export default connect(mapStateToProps, actions)(DateButton)




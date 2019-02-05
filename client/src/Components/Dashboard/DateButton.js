import React, { useEffect, useState } from 'react'
import actions from '../../Actions'
import { connect } from 'react-redux'


const DateButton  = (props) => {

    const [expanded, setExpanded] = useState(null)
    const {records, selected} = props

    useEffect(()=>{

    },[expanded, records])

    const expand=()=>{
        expanded ? setExpanded(null) : setExpanded('expanded')
    }

    const liClick=(e)=>{
        props.setSelectedRecord(e.target.id)
        //execute query to fetch data for record



    }

    const renderRecords = () => {
        const recordsArray = Object.keys(records).map(key=>records[key])
        return recordsArray.map((record)=>
            (<li id={record.date} onClick={(e)=>{liClick(e)}} className="dateBtn_item" key={record.date}>{record.date}</li>))
    }

    const renderCenter = () => {
        return !expanded ? (<div className="dateBtn_center" >{selected.date}<i className="fas fa-chevron-up"></i></div>) :
                            (<div className={`dateBtn_center ${expanded}`}><ul>{renderRecords()}</ul></div>)
    }

        return(
            <button onClick={()=>{expand()}} className="dateBtn">{renderCenter()}</button>
        )
}

const mapStateToProps = (state) => {
    return {
        records: state.records.all,
        selected: state.records.selected
    }
}

export default connect(mapStateToProps, actions)(DateButton)
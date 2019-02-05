import React, { useState, useEffect } from 'react'
import Graph from './Graph'
import { connect } from 'react-redux'
import DateButton from './DateButton'


const Chart = (props) =>  {

  const [dataType, setDataType] = useState('light')

    useEffect(()=>{

    },[dataType, props.date])

  const renderButtons = () => {
    const buttons = ["Light", "Temp", "Humidity", "Moisture"]
    
    return buttons.map((label)=>{

      const buttonClass = dataType === label.toLowerCase() ? 
            "btn_secondary btn_secondary_selected":
            "btn_secondary";
      return (
      <button
        key={label} 
        onClick={(e)=>{setDataType(e.currentTarget.id.toLowerCase())}}
        id={label}
        className={buttonClass}
        >
        <span className="btn_secondary-center">
          {label}
        </span>
      </button>
      )
    })
  }


    return (
      <div className="chart card">
          <h2 className="H_tertiary">{`Data for: ${props.date}`}</h2>
        <Graph dataType={dataType}/>
        <div className="chart_controls">
        <DateButton />
        {renderButtons()}
        </div>
      </div>
    )
  

}



const mapStateToProps = (state) => {
  return {
    date: state.records.selected.date 
  }
}

export default connect(mapStateToProps, null)(Chart)
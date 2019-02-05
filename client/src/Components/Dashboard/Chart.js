import React, { useState, useEffect } from 'react'
import Graph from './Graph'
import DateButton from './DateButton'

// class Chart extends Component {

//   state={
//     date: "01/30/2019",
//     selected: "Light"
//   }

//   setSelected = (e) => {
//     this.setState({selected: e.currentTarget.id})
//   }

//   renderButtons = () => {
//     const buttons = ["Light", "Temp", "Humidity", "Moisture"]
    
//     return buttons.map((label)=>{

//       const buttonClass = this.state.selected === label ? 
//             "btn_secondary btn_secondary_selected":
//             "btn_secondary";
//       return (
//       <button
//         key={label} 
//         onClick={this.setSelected}
//         id={label}
//         className={buttonClass}
//         >
//         <span className="btn_secondary-center">
//           {label}
//         </span>
//       </button>
//       )
//     })
//   }

//   render(){
//     return (
//       <div className="chart card">
//         <Graph />
//         <div className="chart_controls">
//         <DateButton />
//         {this.renderButtons()}
//         </div>
//       </div>
//     )
//   }

// }





// export default Chart


const Chart = (props) =>  {



  const [dataType, setDataType] = useState('Light')

    useEffect(()=>{

    },[dataType, ])

  const renderButtons = () => {
    const buttons = ["Light", "Temp", "Humidity", "Moisture"]
    
    return buttons.map((label)=>{

      const buttonClass = dataType === label ? 
            "btn_secondary btn_secondary_selected":
            "btn_secondary";
      return (
      <button
        key={label} 
        onClick={(e)=>{setDataType(e.currentTarget.id)}}
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
        <Graph />
        <div className="chart_controls">
        <DateButton />
        {renderButtons()}
        </div>
      </div>
    )
  

}





export default Chart
import React, {Component} from 'react'

const data = [
"Green Apple 1",
"Green Apple 2",
"Green Apple 3"
]

class DateButton extends Component {

    state={
        expanded: null,
        selected: "Green Apple 1"
    }

    expand=()=>{
        const expanded = this.state.expanded;
        expanded ? this.setState({expanded: null}) :
        this.setState({expanded: "expanded"})
    }

    setSelected = (selected) => {
        this.setState({selected})
    }

    liClick=(e)=>{
        this.setSelected(e.target.id);
    }

    renderCenter = () => {
        const expanded = this.state.expanded
        if(!expanded){
            return (<div className="dateBtn_center" >{this.state.selected }<i class="fas fa-chevron-up"></i></div>)
        }else{
            //insert expanded center scroll view of dates
            let list = data.map((el)=>{
                return (<li id={el} onClick={(e)=>{this.liClick(e)}} className="dateBtn_item" key={el}>{el}</li>)
            })

            return (<div className={`dateBtn_center ${this.state.expanded}`}><ul>{list}</ul></div>)
        }
    }

    render(){
        return(
            <button onClick={()=>{this.expand()}} className="dateBtn">{this.renderCenter()}</button>
        )
    }

}

export default DateButton
import React, {Component} from 'react'

const data = [
    "01/30/2019",
    "01/29/2019",
    "01/28/2019",
    "01/27/2019",
    "01/26/2019",
    "01/25/2019",
    "01/24/2019",
    "01/23/2019",
    "01/22/2019",
    "01/21/2019",
    "01/20/2019",
    "01/30/2019",
    "01/29/2019",
    "01/28/2019",
    "01/27/2019",
    "01/26/2019",
    "01/25/2019",
    "01/24/2019",
    "01/23/2019",
    "01/22/2019",
    "01/21/2019",
    "01/20/2019",
    "01/30/2019",
    "01/29/2019",
    "01/28/2019",
    "01/27/2019",
    "01/26/2019",
    "01/25/2019",
    "01/24/2019",
    "01/23/2019",
    "01/22/2019",
    "01/21/2019",
    "01/20/2019",
    "01/30/2019",
    "01/29/2019",
    "01/28/2019",
    "01/27/2019",
    "01/26/2019",
    "01/25/2019",
    "01/24/2019",
    "01/23/2019",
    "01/22/2019",
    "01/21/2019",
    "01/20/2019",
    "01/30/2019",
    "01/29/2019",
    "01/28/2019",
    "01/27/2019",
    "01/26/2019",
    "01/25/2019",
    "01/24/2019",
    "01/23/2019",
    "01/22/2019",
    "01/21/2019",
    "01/20/2019",
    "01/30/2019",
    "01/29/2019",
    "01/28/2019",
    "01/27/2019",
    "01/26/2019",
    "01/25/2019",
    "01/24/2019",
    "01/23/2019",
    "01/22/2019",
    "01/21/2019",
    "01/20/2019",
]

class DateButton extends Component {

    state={
        expanded: null,
        selected: "01/30/2019"
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
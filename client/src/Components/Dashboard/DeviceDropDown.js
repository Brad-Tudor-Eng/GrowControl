import React, {Component} from 'react'
import { connect } from 'react-redux'
import actions from '../../Actions'


class SelectDevice extends Component {

    state={
        expanded: null,
        selected: "Select A Device"
    }
    componentDidMount(){
        console.log(this.props)
    }

    expand=()=>{
        const expanded = this.state.expanded;
        expanded ? this.setState({expanded: null}) :
        this.setState({expanded: "expanded"})
    }

    setSelected = (selected) => {
        this.setState({selected})
        this.props.select(selected)
    }

    liClick=(e)=>{
        this.setSelected(e.target.id);
    }

    mapList = () => {
        const devices = this.props.device.devices
        const deviceNames = Object.keys(devices)
        return deviceNames.map((el)=>{
            return (<li id={el} onClick={(e)=>{this.liClick(e)}} className="selectDevice_item" key={el}>{el}</li>)
        })
    }

    renderCenter = () => {
        const expanded = this.state.expanded
        if(!expanded && this.state.selected === "Select A Device"){
            return (<div className="selectDevice_center" >{this.state.selected }<i className="fas fa-chevron-up"></i></div>)
        }else if(!expanded ){
            return (<div className="selectDevice_center" >Device: {this.state.selected }<i className="fas fa-chevron-up"></i></div>)
        }else{
            //insert expanded center scroll view of dates
            let list = this.mapList()
            return (<div className={`selectDevice_center ${this.state.expanded}`}><ul>{list}</ul></div>)
        }
    }

    render(){
        return(
            <button onClick={()=>{this.expand()}} className="selectDevice">{this.renderCenter()}</button>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        device: state.device
    }
}

export default connect(mapStateToProps, actions)(SelectDevice)
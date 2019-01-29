import React, { Component } from 'react'
import {  connect } from 'react-redux'
import actions from '../../Actions'

import Chart from './Chart'
import DataTable from './DataTable'
import DeviceInfo from './DeviceInfo'
import Gauges from './Gauges'
import Menu from './Menu'


class Dashboard extends Component {
    render(){
        console.log(this.state)
        return(
            <div className="dashboard" >
                <Menu />
                <Chart />
                <DataTable />
                <DeviceInfo />
                <Gauges />
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return (
        state
    )
}

export default connect(mapStateToProps, actions)(Dashboard)
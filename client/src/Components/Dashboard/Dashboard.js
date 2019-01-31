import React, { Component } from 'react'
import {  connect } from 'react-redux'
import actions from '../../Actions'

import Chart from './Chart'
import DataTable from './DataTable'
import DeviceInfo from './DeviceInfo'
import Gauges from './Gauges'
import Menu from './Menu'
import Modal from './Modal'


class Dashboard extends Component {

    state={
        showModal: false,
        menu: null
    }

    setModal = () => {
        const showModal = !this.state.showModal    
        this.setState({showModal})
    }

    setMenu = (menu) => {
        this.setState({menu})
    }


    render(){
        return(


            <div className="dashboard" >
            {this.state.showModal ? 
                <Modal setModal={this.setModal}  menu={this.state.menu}/> 
                : null }
                <Menu setModal={this.setModal} setMenu={this.setMenu}  />
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
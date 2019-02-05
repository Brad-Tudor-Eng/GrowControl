import React, { Component } from 'react'
import {  connect } from 'react-redux'
import actions from '../../Actions'

import gql from "graphql-tag";
import { Query } from "react-apollo";
import Cookies from 'js-cookie';

import Chart from './Chart'
import DataTable from './DataTable'
import DeviceInfo from './DeviceInfo'
import Gauges from './Gauges'
import Menu from './Menu'
import Modal from './Modal'



//this query loads the user devices
const USER = gql`
query FindUser($data:FindUserInput){
  findUser(data: $data){
      id
      email
      device{
      id
      dev_name
      settings{
        light {average tol}
        temp {average tol}
        humidity {average tol}
        moisture {average tol}
      }  
      records{
        date
        data{
          time
          light
          temp
          humidity
          moisture
        }
      }
    }
  }
}
`  




// on loading fetch user devices and records

class Dashboard extends Component {

    state={
        showModal: false,
        menu: null,
        token: null,
    }

    componentDidMount(){
      this.setState({token: Cookies.get('xAuthG') })
      this.props.updateUser({token: Cookies.get('xAuthG') }) 
    }

    setModal = () => {
        const showModal = !this.state.showModal    
        this.setState({showModal})
    }

    setMenu = (menu) => {
        this.setState({menu})
    }

    parseQuery = ( data ) => {
      const {id, email} = data
      const user = {id, email}
    //if no devices loaded set the devices attached to the user
      const obj = this.props.device.devices
        if(data.device !== [] && Object.keys(obj).length === 0 ){
          let devices = data.device
          this.props.updateDevices(devices)
    //set the records of the first device to the selected records
          const records = devices[0].records
          if(records !== []){
            this.props.setDeviceRecords(records)
          }
        }
    //set the logged in user to the current user
        if(this.props.user.id === null){
          this.props.updateUser(user)
        }
    }

    usr = (token) => (
      <Query
        query={USER}
        variables={{data: {token}}}
        onCompleted = {(data)=>{
          this.parseQuery(data.findUser)
        }}
        onError = {
          (error)=>{
            console.log(error)
          }
        }
      >
        {({ loading, error, data }) => {
          return (
            <div className="dashboard">
              {this.state.showModal ? 
                <Modal setModal={this.setModal}  menu={this.state.menu}/> 
                : null }
                <Menu setModal={this.setModal} setMenu={this.setMenu}  />
                <Chart />
                <DataTable />
                <DeviceInfo />
                <Gauges />
            </div>
          );
        }}
      </Query>
    );


    render(){

        return(
          <div>
            {this.usr(this.state.token)} 
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





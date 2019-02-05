import React, {Component} from 'react'
import { connect } from 'react-redux'
import gql from "graphql-tag"
import actions from '../../Actions'
import { Mutation } from "react-apollo"
import Cookies from 'js-cookie'

import DeviceDropDown from './DeviceDropDown'
import Spinner from '../General/Spinner'



//Can Add a device to a user
//Can Change users selected device
//Can Delete the selected device

const DELETE_DEVICE = gql`
  mutation deleteDevice($data: DeleteDeviceInput!) {
    deleteDevice(data: $data) {
      id
    }
  }`;

  const ADD_DEVICE = gql`
  mutation addDeviceToUser($data: AddDeviceToUserInput!) {
    addDeviceToUser(data: $data) {
        id
      dev_name
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
`;


class DeviceMenu extends Component {

    state={
        selectedDevice: null,
        inputDeviceName: "",
        deleteDevice: null,
        errorMsg: null,
        loading: false
    }

    setError = (error) => {
        const msg = error.message.slice(error.message.indexOf(":")+2)
        this.setState({errorMsg: msg})
      }

    setSelected = (deviceName) => {
        this.setState({selectedDevice: deviceName})
    }

    setDeleteDevice = (deviceName) =>{
        this.setState({DeleteDevice: deviceName})
    }

    // button click actions

    deleteDevice = (deleteDev) => {
        this.setState({loading: true})
        //make sure the delete device is selected
        if(this.state.deleteDevice){
            const device = this.props.device.devices[this.state.deleteDevice]
            const id = device._id
            //update the global state
            this.props.deleteDevice(this.state.deleteDevice)
            //execute the deleteDevice mutatiom
            deleteDev({ variables: { 
                            data: {
                                deviceId: id
                                } 
                            } 
                        })
        }else{
            this.setError({errorMsg: 'Must select a device to delete'})
        }
    }

    selectDevice = () => {
        if(this.state.selectedDevice){
           const devName = this.state.selectedDevice
            this.props.setSelectedDevice(devName)
        //fetch the device from state
             const devices = this.props.devices.devices
             const device = devices[devName]
             if(device.records.length > 0){
                 const records = device.records
                 this.props.setDeviceRecords(records)
             }
             this.props.closeModal()
         }
    }

    addDevice = (addDev) =>{
        this.setState({loading: true})
        if(this.state.inputDeviceName){
            const token = Cookies.get('xAuthG')
            //get the device id
             const deviceName = this.state.inputDeviceName
            //get the user id
             const userId = this.props.user.id
// console.log('ready for mutation')
            //execute add device mutation
            addDev({ variables: { 
                data: {
                    deviceName,
                    userId,
                    token
                    } 
                } 
            })
        }
    }

    completeADD = (device) => {
        //set the device as the selected device
        this.setState({loading: false})
        this.setState({selectedDevice: device.dev_name})
        this.props.addDevice(device)
    }


    render(){
        return(
            <div className="deviceMenu">
                <div className="deviceMenu_row">
                    <div className="dropdownContainer">
                        <DeviceDropDown select={this.setSelected}/>
                    </div>  {this.state.loading ? <Spinner /> :                     
                                <button 
                                onClick = {()=>{ this.selectDevice() }}
                                className="btn_primary btn_primary deviceMenu_btn">
                                    <span className="btn_primary-center">Set Device</span>
                                </button> 
                            }
                </div>

                <h2 className="H_secondary H_secondary-sub">OR</h2>

                <div className="deviceMenu_row">
                    <input 
                        className="deviceMenu_input" 
                        placeholder="Device Name:"
                        value = {this.state.inputDeviceId}
                        onChange={(e)=>{this.setState({inputDeviceName:e.target.value})}}
                    />

                    {
                        this.state.loading ? <Spinner /> : 
                        <Mutation 
                        mutation={ADD_DEVICE} 
                        onError={(error)=>{
                            this.setState({loading: false})
                            this.setError(error)
                            }}
                        onCompleted={({addDeviceToUser})=>{ 
                            this.completeADD(addDeviceToUser)
                        }}
                        >
                            { (addDeviceToUser, { data }) => (
                                    <button 
                                    onClick = {()=>{ this.addDevice(addDeviceToUser) }}
                                    className="btn_primary btn_primary--add deviceMenu_btn">
                                        <span className="btn_primary-center">Add Device</span>
                                    </button>
                                ) 
                            }
                        </Mutation>
                    }
 
                </div>

                <div className="deviceMenu_row">
                <div className="dropdownContainer">
                        <DeviceDropDown select={this.setDeleteDevice}/>
                    </div>  
                    {
                        this.state.loading ? <Spinner /> : 
                        <Mutation 
                        mutation={DELETE_DEVICE} 
                        onError={(error)=>{
                            
                            this.setError(error)
                        }}
                        onCompleted={()=>{ this.props.closeModal() }}
                        >
                            { (deleteDevice, { data }) => (
                                <button 
                                onClick = {()=>{ this.deleteDevice(deleteDevice) }}
                                className="btn_primary btn_primary--del deviceMenu_btn">
                                    <span className="btn_primary-center">Del Device</span>
                                </button>
                                ) 
                            }
                        </Mutation> 
                    }
                </div>
                <p className="error">{this.state.errorMsg}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        devices: state.device
    }
}

export default connect(mapStateToProps , actions)(DeviceMenu)



// updateBtn = (updateUser) =>{
//     if(this.state.loading){
//         return(<div> <Spinner /> </div>) 
//     }else{
//         return (
//         <button className="btn_primary"
//         onClick={ ()=>{
//             this.setState({loading: true})
//             updateUser({ variables: { 
//             data: {
//                 userId: this.props.user.id,
//                 email: this.state.email,
//                 password: this.state.password,
//                 token: this.props.user.token
//                 } 
//             } 
//             })
            
//         }}
        
//         >
//         <span className="btn_primary-center">Update</span>
//         </button>
//         )
//     }
// }

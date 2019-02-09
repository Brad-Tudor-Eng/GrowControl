import React, {useState} from 'react'
import gql from "graphql-tag";
import {  ApolloConsumer } from "react-apollo";
import { connect } from 'react-redux'
import Cookies from 'js-cookie';

//This component displays the current device info


const UPDATE_DEVICE = gql`
mutation updateDevice($data: UpdateDeviceInput!) {
    updateDevice(data: $data) {
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
`;




const updateDeviceMutation = async ({ deviceId, name, oldName, oldSettings, newSettings ,client}) => {
    let token = await Cookies.get('xAuthG')
    const updateName = name === '' ? oldName : name;
    let s = oldSettings
    for(let key in newSettings){
        if(newSettings[key].average !== ""){
            s[key].average = parseFloat(newSettings[key].average)
        }
        if(newSettings[key].tol !== ""){
            s[key].tol = parseFloat(newSettings[key].tol)
        }
    }  
    const { data } = await client.mutate({
      mutation:UPDATE_DEVICE,
      variables:{data: {deviceId ,token, name:updateName, settings:s }}
    });
    
    const { updateDevice } = data
    
  }


const DeviceInfo = (props) =>  {

    let settings = props.device.settings || { light: {average: 0, tol: 0}, 
                        temp: {average: 0, tol: 0}, 
                        humidity: {average: 0, tol: 0}, 
                        moisture: {average: 0, tol: 0}
                    }


    let name = props.device.dev_name || "Loading..."

    for (let key in settings){
        let {average, tol} = settings[key]
        settings[key] = {average, tol}
    }
    delete settings.__typename

  
    const {light, temp, humidity, moisture} = settings
    
    const [newName, setNewName] = useState('')
    const [lightAvg, setLightAvg] = useState('')
    const [lightTol, setLightTol] = useState('')
    const [tempAvg, setTempAvg] = useState('')
    const [tempTol, setTempTol] = useState('')
    const [humidityAvg, setHumidityAvg] = useState('')
    const [humidityTol, setHumidityTol] = useState('')
    const [moistureAvg, setMoistureAvg] = useState('')
    const [moistureTol, setMoistureTol] = useState('')
  
        return (
            <div className="deviceInfo card">
                <h2 className="H_secondary H_secondary-sub">Update Device</h2>

                <span className="dev_info_header dev_info_header-light">light</span>
                <span className="dev_info_header dev_info_header-temp">temp</span>
                <span className="dev_info_header dev_info_header-humidity">humidity</span>
                <span className="dev_info_header dev_info_header-moisture">moisture</span>

                <span className="dev_info_label dev_info_label-average">Avg</span>
                <span className="dev_info_label dev_info_label-tolerance">Tol</span>

                <input 
                    className="P dev_info dev_info_name"
                    placeholder={`Device Name: ${name}`} 
                    value = {newName}
                    onChange = {(e)=>{setNewName(e.target.value)}}
                />

                <input 
                    placeholder={light.average} 
                    className="P dev_info-avg dev_info-avg-light"
                    value = {lightAvg}
                    onChange = {(e)=>{setLightAvg(e.target.value)}} 
                />
                <input 
                    placeholder={`+/- ${light.tol}`} 
                    className="P dev_info-tol dev_info-tol-light" 
                    value = {lightTol}
                    onChange = {(e)=>{setLightTol(e.target.value)}} 
                />

                <input 
                    placeholder={temp.average} 
                    className="P dev_info-avg dev_info-avg-temp"
                    value = {tempAvg}
                    onChange = {(e)=>{setTempAvg(e.target.value)}}  
                />
                <input 
                    placeholder={`+/- ${temp.tol}`} 
                    className="P dev_info-tol dev_info-tol-temp"
                    value = {tempTol}
                    onChange = {(e)=>{setTempTol(e.target.value)}}  
                />

                <input 
                    placeholder={humidity.average} 
                    className="P dev_info-avg dev_info-avg-humidity"
                    value = {humidityAvg}
                    onChange = {(e)=>{setHumidityAvg(e.target.value)}}  
                />
                <input 
                    placeholder={`+/- ${humidity.tol}%`} 
                    className="P dev_info-tol dev_info-tol-humidity"
                    value = {humidityTol}
                    onChange = {(e)=>{setHumidityTol(e.target.value)}}  
                />

                <input 
                    placeholder={moisture.average} 
                    className="P dev_info-avg dev_info-avg-moisture"
                    value = {moistureAvg}
                    onChange = {(e)=>{setMoistureAvg(e.target.value)}}  
                />
                <input 
                    placeholder={`+/- ${moisture.tol}%`} 
                    className="P dev_info-tol dev_info-tol-moisture"
                    value = {moistureTol}
                    onChange = {(e)=>{setMoistureTol(e.target.value)}}  
                />
                
                <ApolloConsumer >
                {client => (
                <button 
                onClick = {(event)=>{ 
                    updateDeviceMutation( 
                        {   client, deviceId: props.device.id, 
                            oldName: props.device.dev_name, name: 
                            newName, 
                            oldSettings: settings,
                            newSettings: {
                                light: {average: lightAvg, tol: lightTol},
                                temp: {average: tempAvg, tol: tempTol},
                                humidity: {average: humidityAvg, tol: humidityTol},
                                moisture: {average: moistureAvg, tol: moistureTol},
                            }
                        } ) 
                    //reset all inputs
                        setNewName('')
                        setLightAvg('')
                        setLightTol('')
                        setTempAvg('')
                        setTempTol('')
                        setHumidityAvg('')
                        setHumidityTol('')
                        setMoistureAvg('')
                        setMoistureTol('')
                    }}
                className="dev_info_btn btn_secondary"><span className="btn_secondary-center">Submit</span></button>
                )}
                </ApolloConsumer>
            </div>
        )
    
}

const mapStateToProps = (state) => {
    return {
        device: state.device.selectedDevice
    }
}

export default connect(mapStateToProps, null)(DeviceInfo)
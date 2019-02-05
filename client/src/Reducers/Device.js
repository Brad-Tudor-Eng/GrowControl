import * as actions from '../Actions/types'

const INITIAL_STATE = {
    selectedDevice: {},
    devices: {}
 }

 //figure 


export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case actions.ADD_DEVICE: {
            //receives a device object
            const device = action.payload
            const deviceName = device.dev_name
            let devices = {...state.devices}
            devices[deviceName] = {id: device.id, dev_name: device.dev_name}
            return {...state, devices}
        }
        case actions.UPDATE_DEVICE: {
            //receives a device object 
            let obj = state.devices
            const device = action.payload
            let devices = Object.keys(obj).map( key=> obj[key] === device.dev_name ? device : obj[key] )
            return {...state, devices}
        }
        case actions.UPDATE_DEVICES: {
            //receives an array of devices. records attached
            let devArry = action.payload
            let obj = state.devices
            devArry.forEach(device => {
                obj[device.dev_name] = device
            });
            let dev = state.selectedDevice
            //check to see if there is a selected device
            if(Object.keys(dev).length === 0){
                 dev = devArry[0]
            }
            return {selectedDevice: dev, devices: obj}
        }
        case actions.DELETE_DEVICE: {
            //receives a device name and removes it from the object
            const deviceName = action.payload
            const obj = state.devices;
            const devices = Object.keys(obj).reduce((col, key)=>{
                if(deviceName !== key){ col[key] = obj[key] }             
                return col
            })

            return {...state, devices}
        }
        case actions.SET_SELECTED_DEVICE:{
            const deviceName = action.payload
            const device = state.devices[deviceName]
            let selectedDevice = {}
            selectedDevice = {id: device.id, dev_name: device.dev_name}
            return {selectedDevice, devices: {...state.devices}}
        }
        default: return state
    }
}
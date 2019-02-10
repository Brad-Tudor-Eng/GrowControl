import * as actions from './types'

//Device

export const addDevice = (device) => {
    return {
        type: actions.ADD_DEVICE,
        payload: device
    }
}

export const updateDevice = (device) => {
    return {
        type: actions.UPDATE_DEVICE,
        payload: device
    }
}

export const updateDevices = (devices) => {
    return {
        type: actions.UPDATE_DEVICES,
        payload: devices
    }
}

export const deleteDevice = (deviceName) =>{
    return {
        type: actions.DELETE_DEVICE,
        payload: deviceName
    }
}

export const setSelectedDevice = (deviceName) => {
    return {
        type: actions.SET_SELECTED_DEVICE,
        payload: deviceName
    }
}
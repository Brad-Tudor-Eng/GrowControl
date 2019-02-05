import * as actions from './types'

//update an individual record
export const updateRecord = (data) => {
    return{
        type: actions.UPDATE_RECORD,
        payload: data
    }
}
//set device records
export const setDeviceRecords = (records) => {
    return {
        type: actions.SET_DEVICE_RECORDS,
        payload: records
    }
}
export const setSelectedRecord = (record) => {
    return{
        type: actions.SET_SELECTED_RECORD,
        payload: record
    }
}


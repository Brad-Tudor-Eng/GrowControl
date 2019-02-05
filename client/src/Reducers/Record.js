import * as actions from '../Actions/types'

//Records will come in as an array of Record
//Records stored will only be for the selected device
//individual record will = {date: DD/MM//YYYY, data: [ {time, light, temp, humidity, moisture} ] }
//state will have a key with date and a value of data

//selected is the day selected
//all is the complete list of record dates for the device

const INITIAL_STATE = {
    selected: {},
    all: {}
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case actions.UPDATE_RECORD:{
            //receive a single data object
            //push it to any record with the current date

            return state;
        }
        case actions.SET_DEVICE_RECORDS:{
            //reset all records set selected to the first date
            let records = action.payload
            let selected = records[0]
            let all = {...records}
            return {selected, all};
        }
        case actions.SET_SELECTED_RECORD:{

            return state
        }
        default: return state
    }
}
import * as actions from '../Actions/types'
import moment from 'moment'


//Records will come in as an array of Record
//Records stored will only be for the selected device
//individual record will = {date: DD/MM//YYYY, data: [ {time, light, temp, humidity, moisture} ] }
//state will have a key with date and a value of data

//selected is the day selected
//all is the complete list of record dates for the device

const INITIAL_STATE = {
    selected: {},
    all: {},
    today: []
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case actions.UPDATE_RECORD:{

                let record = action.payload
                let newSet = state.today
                newSet.push(record)
            return {...state, today:newSet};
        }
        case actions.SET_DEVICE_RECORDS:{
            //reset all records set selected to the first date
            let records = action.payload
            //set selected and today to last record in list
            if(records.length > 0){
                let latest = records[records.length-1]
                let selected = latest
                let td = moment().format('MM/DD/YYYY')
                let today = []
             
                if(latest.date === td){ today = latest.data }
    
                let all = {}
    
                records.forEach(record => {
                    all[record.date] = record
                })
    
                return {selected, all, today};
            }else{
                return INITIAL_STATE
            }

        }
        case actions.SET_SELECTED_RECORD:{
            const record = action.payload
            return {...state, selected: record}
        }
        default: return state
    }
}
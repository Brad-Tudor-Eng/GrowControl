import { combineReducers } from 'redux'
import User from './User'
import Device from './Device'
import Record from './Record'

export default combineReducers({
    user: User,
    device: Device,
    records: Record,
})
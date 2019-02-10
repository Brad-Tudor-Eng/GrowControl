import Device from '../../models/Device'
import moment from 'moment'
import { ObjectID } from 'mongodb'
import _ from 'lodash'


//   retrieve all records for single day     [ X ]
//   retrieve all records for range of dates []
//   retrieve all records from a device      []

//   format for record date: DD/MM/YYYY

export const recordOneDay = async (parent, {data}, ctx, info) =>{
//given User ID and Device ID return a record for a single day
     const {deviceId, date} = data
     const device = await Device.findById( ObjectID(deviceId) )
     const record = device.records.find( (el)=> el.date === date )
     return record
}

export const recordDateRange = async (parent, {data}, ctx, info) =>{
//given User ID, Device ID and a range of dates find all records for device
//between the range of dates
     const {deviceId, startDate, endDate} = data
     const device = await Device.findById( deviceId )
    
     const records = device.records.map((el)=>{
          
        
          const date = moment(el.date, 'L').format()
          
          const startDateFormatted = moment(startDate, 'L').format()
          const endDateFormatted = moment(endDate, 'L').format()
          if( moment(date).isBetween(startDateFormatted, endDateFormatted) ){
               return el
          }
     })
     return records

}

export const recordAll = async (parent, {data}, ctx, info) =>{
//given User ID and Device ID return an array of all records for that device
     const { deviceId } = data
     const device = await Device.findById( ObjectID(deviceId) )    
     if(device.records){return device.records}
     else{ throw new Error('No Records Found')}

}
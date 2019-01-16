import Device from '../../models/Device'


//   retrieve all records for single day     []
//   retrieve all records for range of dates []
//   retrieve all records from a device      []

//   format for record date: DD/MM/YYYY

export const recordOneDay = async (parent, {data}, ctx, info) =>{
//given User ID and Device ID return a record for a single day
     const {deviceId, date} = data
     const device = Device.findById( deviceId ).populate('records')

    return records
}

export const recordDateRange = async (parent, {data}, ctx, info) =>{
//given User ID, Device ID and a range of dates find all records for device
//between the range of dates
     const {deviceId, startDate, endDate} = data
     const device = Device.findById( deviceId ).populate('records')
     
     return records
}

export const recordAll = async (parent, {data}, ctx, info) =>{
//given User ID and Device ID return an array of all records for that device
     const {deviceId} = data
     const device = Device.findById( deviceId ).populate('records')     
     if(device.records){return device.records}
     else{ throw new Error('No Records Found')}

}
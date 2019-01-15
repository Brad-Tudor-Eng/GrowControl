import db from 'mongodb'
import User from '../../models/User'

export const user = async (parent, {data}, ctx, info) =>{
    const {id, email} = data
    let user

    if(id){
         user =  await User.findById(db.ObjectID(id))
    }else if(email){
         user =  await User.findOne({email})
    }

    return user
}


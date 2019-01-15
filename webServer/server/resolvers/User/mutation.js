import User from '../../models/User'

//  create a new user       []
//  update a user email     []
//  update a user password  []
//  delete a user           []


export const createUser = async (parent, {data}, { pubsub }, info)=>{
    const user = await User.create({ ...data })
    const newUser = {   id: user._id.toString(), 
                        name: user.name, 
                        email: user.email
                    }
                    pubsub.publish('user',{user: newUser})
    return newUser
}
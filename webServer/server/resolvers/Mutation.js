import User from '../models/User'

const createUser = async (parent, {data}, { pubsub }, info)=>{
    const user = await User.create({ ...data })
    const newUser = {   id: user._id.toString(), 
                        name: user.name, 
                        email: user.email
                    }
                    pubsub.publish('user',{user: newUser})
    return newUser
}


const Mutation = {
    createUser
}


export default Mutation
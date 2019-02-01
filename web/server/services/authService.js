import User from '../models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const signUp = ({data,auth}) => {
    //check auth token

    //validate input

    // validate password
    const {password} = data
    if(password.length < 5){throw new Error('password must be 8 chr or longer')}
    //if valid hash
    var hash = bcrypt.hashSync(password, 10);
    //create a new user
    const user = new User({...data,token:"" ,password: hash})
    user.token = jwt.sign({id: user._id},process.env.JWT_KEY,{ expiresIn: 30 * 24 * 60 * 60 })
    user.save()
    return user
}

const login = ({data,auth}) => {
    //hash pass
}

const logOut = ({data,auth}) => {
    // accept user id
    // find user
    // delete token from user in database
}

export default {
    signUp,
    login,
    logOut
}
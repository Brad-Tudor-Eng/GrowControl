import User from '../models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import { ObjectID } from 'mongodb'

const signUp = async ( data ) => {

    let regexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/ig;

    const {email, password} = data
        //validate password
    if(password.length < 3){throw new Error('Password should proably be a little longer...')}
        //validate email
    if(!regexp.test(email)){throw new Error('Not an email')}
        //check to see if the user already exists
    const user = await User.findOne({email})
    if(user){throw new Error('Email is already in the system')}
        // hash the password
    var hash = bcrypt.hashSync(password, 10);
        // create a new user
    let newUser = new User({email ,token:"" , password: hash})
        // create a token for the user
    newUser.token = jwt.sign({id: newUser._id},process.env.JWT_KEY,{ expiresIn: 30 * 24 * 60 * 60 })
        //save the user to the database
    newUser.save()
        //return the user
    return newUser
}

const login = async (data) => {
    const {email, password} = data;
    //find the user by email
     let user = await User.findOne({email}).populate('device')
     if(!user){throw new Error('Wrong! Try again...')}
    //compare the user password to the one provided
    const compare = bcrypt.compareSync(password, user.password);

    console.log(compare)
    //if its a match return the token
    if(compare){
        user.token = jwt.sign({id: user._id},process.env.JWT_KEY,{ expiresIn: 30 * 24 * 60 * 60 })
        user.save()
        return user
    }else{
        throw new Error('Wrong! Try again...')
    }
}

const logOut = (data) => {
    const id = data
    console.log(id)
    // const user = User.findByIdAndUpdate(ObjectID(id), {token: ""})
    return null;
}

export default {
    signUp,
    login,
    logOut
}
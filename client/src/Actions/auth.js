import * as actions from './types'

export const login = (user) => {
    return {
        type: actions.LOGIN,
        payload: user
    }
}

export const signUp = (user) => {
    return {
        type: actions.SIGN_UP,
        payload: user
    }
}

export const logOut = () =>{
    return { type: actions.LOGOUT }
}
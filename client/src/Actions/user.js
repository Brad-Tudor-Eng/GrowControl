import * as action from './types'

//User

export const updateUser = (user) => {
    return {
        type: action.UPDATE_USER,
        payload: user
    }
}
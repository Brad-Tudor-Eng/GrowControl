import * as actions from '../Actions/types'

const INITIAL_STATE = { }


export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case actions.SIGN_UP: {
            const user = action.payload
            return {...state, ...user}
        }
        case actions.LOGIN:{
            const user = action.payload
            return {...state, ...user}
        }
        case actions.LOGOUT:{
            return {}
        }
        default: return state
    }
}
import * as actions from '../Actions/types'

const INITIAL_STATE = {}

export default (state = INITIAL_STATE , action) => {
    switch(action.type){
        case actions.TEST: {
            const payload = action.payload
            return {...state, ...payload}
        }
        default: return state
    }
}
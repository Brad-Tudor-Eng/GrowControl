import * as actions from './types'

export const testAction = (item) => {
    return {
        type: actions.TEST,
        payload: {...item}
    }
}
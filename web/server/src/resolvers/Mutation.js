import * as user from './User/mutation'
import * as device from './Device/mutation'


const Mutation = {
    ...user,
    ...device
}

export default Mutation

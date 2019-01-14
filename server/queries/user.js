const graphql = require('graphql')
import UserType from '../types/UserType'



export const user = {
    type: UserType,
    async resolve(parentValue, args, ctx, info){
        return testUser
    }
}
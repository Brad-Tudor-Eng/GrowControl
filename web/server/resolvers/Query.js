import * as userQueries from './User/query'
//import * as device from './Device/query'
import * as recordQueries from './Record/query'
const Query = {
    ...userQueries,
    ...recordQueries
}

export default Query

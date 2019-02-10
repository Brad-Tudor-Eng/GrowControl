import * as User from './user'
import * as Auth from './auth'
import * as Device from './device'
import * as Records from './records'

export default  {
                ...User,
                ...Auth,
                ...Device,
                ...Records
            }
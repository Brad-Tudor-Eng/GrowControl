const moment = require('moment')

let t1 = moment()

setTimeout(()=>{
    let t2 = moment()
    console.log(t2-t1)
},20000)
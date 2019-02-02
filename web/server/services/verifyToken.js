import jwt from 'jsonwebtoken'

export default (data) => {
  const test = data.hasOwnProperty('token')

  if(test){
    try {
      
        decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log(decoded);
        
      } catch(err) {
        return null
      }
  }else{
    return null
  }


}
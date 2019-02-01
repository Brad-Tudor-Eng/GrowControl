import jwt from 'jsonwebtoken'

export default (token) => {
    try {
      
        decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log(decoded);
        
      } catch(err) {
        return null
      }
}
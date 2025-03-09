import jwt from 'jsonwebtoken'
import { User } from '../model/User.js';
export const userAuth = async (req,res,next)=>{
    try {
     //get token
     const token = req.headers.token;
     
     if (!token) {
        return res.status(403).json({
            message:"please login to access"
          })
     }

     //verify userAuth use token
     const authToken = jwt.verify(token,process.env.LOGIN_KEY)
       
     req.user =await User.findById(authToken._id)
     next()

    } catch (error) {
        return res.status(403).json({
            message:"please login to access"
          })
    }
}
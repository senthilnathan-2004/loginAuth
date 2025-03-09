import sendMail from '../middleware/sendMail.js'
import { User } from "../model/User.js";
import jwt from 'jsonwebtoken'
import bcrypt, { hash } from 'bcryptjs'

//user registeration
export const userRegister = async (req, res) => {
    try {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const { name, email, password } = req.body;
      if (!(pattern.test(email))) {
        return res.status(500).json({
            message:"Incurrect Email"
        })    
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "User Email Already Exists "
        });
      }
      //hash password
      const pass =await bcrypt.hash(password,10)
      console.log(pass)
      
      // Generate OTP
      const otp = Math.floor((Math.random() * 100000) + 100000);
  
      // Create new user object
      const newUser = { name, email, pass};
  
      // Generate activation token using newUser
      const activationToken = jwt.sign({ newUser, otp }, process.env.ACTIVATION_KEY, { expiresIn: "15d" });
  
      // Send email with OTP message
      const message = `Please Verify your account using otp ${otp}`;
      await sendMail(email, `Welcome to ${name}`, message);
  
      // Respond with the activation token
      return res.status(200).json({
        message: "Check your email" ,  
        token:activationToken    
      });
  
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  //user verification
  export const userVerify=async (req,res)=>{
  try {
    
     //get user details
     const {otp,token} = req.body;

     //to verify
     const verify=jwt.verify(token,process.env.ACTIVATION_KEY)
 
     if (!verify) {
       return res.status(500).json({
         message:"Otp Expired"
       })
     }
 
     if (verify.otp != otp) {
       return res.status(500).json({
         message:"Wrong Otp"
       })
     }
 
    await User.create({
       name:verify.newUser.name,
       email:verify.newUser.email,
       password:verify.newUser.pass
     })
 
     return res.status(200).json({
       message:"verification successfully"
     })
  
  } catch (error) {
     return res.status(500).json({
         message:error.message
       })
  }
   
  }

  //user login
  export const userLogin = async (req,res)=>{
    try {
      //destructure user details
      const {email,password} = req.body;
      
      //check user email
      const user =await User.findOne({email})

      if(!user){
        return res.status(500).json({
          message:"Invalid Credentials"
        })
      }
      if(user.password != password){
        return res.status(500).json({
          message:"Invalid Credentials"
        })
      }

      //generate signed token
      const token = jwt.sign({_id:user._id},process.env.LOGIN_KEY,{
        expiresIn:"15d"
      })

    //send user details without password
    const {password:userpassword,...userDetails} = user.toObject()
    
    res.status(200).json({
      message:`Welcome to ${user.name}`,
      token,
      user:userDetails
    })


    } catch (error) {
      return res.status(500).json({
        message:error.message
      })
    }
  }

  //user profile
  export const userProfile = async (req,res)=>{
    try {
      
       const user = await User.findById(req.user._id).select("-password")
  
       //send user profile
       return res.status(200).json(
        {
          user:user
        }
       )
    } catch (error) {
      return res.status(500).json({
        message:error.message
      })
    }
  }
  
  
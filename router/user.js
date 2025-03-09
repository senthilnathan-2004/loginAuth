import express from 'express'
import { userLogin, userProfile, userRegister, userVerify } from '../controllers/userReg.js'
import { userAuth } from '../middleware/userAuth.js'
const router= express.Router()

router.post("/user/register",userRegister)
router.post("/user/verify",userVerify)
router.post("/user/login",userLogin)
router.get("/user/profile",userAuth,userProfile)

export default router

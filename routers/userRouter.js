import express from "express";
import { inserUser } from "../models/user/UserModel.js";
import hashPassword from "../utils/bcryptjs.js";
const router = express.Router()

/* User signup */
router.post("/", async(req,res,next)=>{
try{

    /* encrypt password  */
     req.body.password= hashPassword( req.body.password)
    console.log(req.body.password)
const user = await inserUser(req.body);
user?._id ? 
res.json({
            status:"success",
            message:"your account has been created,you may login now",})
            :
            res.json({
                status:"error",
                message:" Error cretaing user, Please try again later",})   
    } catch(error){
    res.json({
    status:"failed check your error",
    message: error.message
        })
        }
})
/* user logon */

/* user profile */



export default router;

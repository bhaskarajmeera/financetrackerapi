import express from "express";
import { getUserByEmail, inserUser } from "../models/user/UserModel.js";
import hashPassword from "../utils/bcryptjs.js";
const router = express.Router()

/* User signup */
router.post("/", async(req,res,next)=>{
try{

    /* encrypt password  */
     req.body.password= await hashPassword( req.body.password)
    console.log(req.body.password)
    console.log("HASHED:", req.body.password);
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
/* user login*/

router.post("/login",(req,res,next) => {
    try {
        /* RECEIVE EMail and password */

        const {email,password} = req.body;

        if(email && password){res.json({
    status:"success",
    message:"todo login",
    user: "todo",
})
return;
        }
        /*  find the user by email  */
const user = getUserByEmail
        /* match password        */


        /* JWT and store the JWT IN DB*/

res.status(401).json({
    error:error.message,
    
})
        
    } catch (error) {
        res.status(500).json({
            error: error.message,
        })
        
    }
})

/* user profile */



export default router;

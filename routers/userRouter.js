import express from "express";
import { getUserByEmail, inserUser } from "../models/user/UserModel.js";
import { comparePassword,hashPassword } from "../utils/bcryptjs.js";
import { signJWT } from "../utils/jwt.js";
const router = express.Router()

/* User signup */
router.post("/", async(req,res,next)=>{
try{

    /* encrypt password  */
     req.body.password= await hashPassword( req.body.password)
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

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await getUserByEmail(email);

    if (!user?._id) {
      return res.status(400).json({
        status: "error",
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        status: "error",
        message: "Invalid password",
      });
    }

    // Generate JWT
    const accessJWT = signJWT({ email });

    // Success
    return res.json({
      status: "success",
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      accessJWT,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
});


/* user profile */



export default router;

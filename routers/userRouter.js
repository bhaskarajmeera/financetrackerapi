import express from "express";
import { getUserByEmail, inserUser } from "../models/user/UserModel.js";
import { comparePassword,hashPassword } from "../utils/bcryptjs.js";
import { signJWT } from "../utils/jwt.js";
import auth  from "../middlewares/authMiddleware.js";
const router = express.Router()

router.get("/", auth, (req, res, next) => {
  try {
    const user = req.userInfo;

    res.json({
      status: "success",
      message: "Here is the user profile",
      user,
    });
  } catch (error) {
    next(error);  
  }
});
/* /* User signup */
router.post("/signup", async(req,res,next)=>{
try{

    /* encrypt password  */
     req.body.password= await hashPassword( req.body.password)
    
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
    next(error);  
        }
})
/* user login*/
router.post("/login", async (req, res, next) => {
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
      next(error);  
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      next(error);  
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
    next(error);  
  }
});

export default router;
 
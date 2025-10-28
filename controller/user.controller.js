// controllers/user.controller.js
import  User  from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
class UserController {
  // user signup
  async signup(req,res){
    try {
      console.log(req.body);
      const{firstName,lastName,email,password} = req.body;
       if (!firstName || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "First name, email, and password are required",
        });
      }

      const isUserExist = await User.findOne({where : {email}});
      if(isUserExist){
        return res.status(400).json({
          success : false,
          message : "User already Existed"
       })
      }

      const hashPassword = await bcrypt.hash(password,12);
      let userData = await User.create({firstName,email,lastName,password:hashPassword});
      if(userData){
        return res.status(201).json({
          success : true,
          message : "User Register Successfully"
       })
      }
    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  }

  //  User Login
  async login(req, res) {
    try {
      const {email,password } = req.body;
       if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "email and password are required",
        });
      }

      const isUserExist = await User.findOne({where : {email : email}});
      if(!isUserExist){
        return res.status(400).json({
          success: false,
          message: "Incorrect User Email",
        });
      }

      const isPasswordMatch = await bcrypt.compare(password,isUserExist.password);
      if(!isPasswordMatch){
        return res.status(400).json({
          success: false,
          message: "Incorrect User Email/Passwprd",
        });
      }

      const token = jwt.sign(
        {id : isUserExist.id,email : isUserExist.email},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : "1h"}
      )

      return res.status(200).json({
        data: {
          id: isUserExist.id,
          email: isUserExist.email,
          name: `${isUserExist.firstName} ${isUserExist.lastName}`,
        },
        token,
        success : true,
        message: "Login successful",
      });
    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async createPost(req,res){
    
  }

  async createComment(req,res){

  }

  async likePost(req,res){
    
  }
  
}

// Export single instance (common pattern)
export default new UserController();

// controllers/user.controller.js
import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import formidable from "formidable";
import FormValidators from "../validators/user.validator.js";
import Post from "../model/post.model.js";
import Comment from "../model/comments.model.js";
import Association from "../model/associations.js";
import { sequelize } from "../config/mysql.db.js";
import { Op } from "sequelize";
class UserController {
  // user signup
  async signup(req, res) {
    try {
      console.log(req.body);
      const { firstName, lastName, email, password } = req.body;
      if (!firstName || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "First name, email, and password are required",
        });
      }

      const isUserExist = await User.findOne({ where: { email } });
      if (isUserExist) {
        return res.status(400).json({
          success: false,
          message: "User already Existed",
        });
      }

      const hashPassword = await bcrypt.hash(password, 12);
      let userData = await User.create({
        firstName,
        email,
        lastName,
        password: hashPassword,
      });
      if (userData) {
        return res.status(201).json({
          success: true,
          message: "User Register Successfully",
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  }

  //  User Login
  async login(req, res) {
    try {
      let form = formidable({ multiples: false });
      form.parse(req, async (err, fields, files) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: "Failed to parse the form.",
          });
        }
        let email = fields["email"]?.[0];
        let password = fields["password"]?.[0];

        const result = await FormValidators.loginValidator().validateAsync({
          email,
          password,
        });
        if (result.error) {
          return res.status(400).json({
            success: false,
            message: "Something went wrong.",
            result: [],
          });
        }
        const isUserExist = await User.findOne({ where: { email: email } });
        if (!isUserExist) {
          return res.status(400).json({
            success: false,
            message: "Incorrect User Email",
          });
        }
        const isPasswordMatch = bcrypt.compare(password, isUserExist.password);
        if (!isPasswordMatch) {
          return res.status(400).json({
            success: false,
            message: "Incorrect User Email/Passwprd",
          });
        }

        const token = jwt.sign(
          { id: isUserExist.id, email: isUserExist.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1h" }
        );

        return res.status(200).json({
          data: {
            id: isUserExist.id,
            email: isUserExist.email,
            name: `${isUserExist.firstName} ${isUserExist.lastName}`,
          },
          token,
          success: true,
          message: "Login successful",
        });
      });
    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  }

  async createPost(req, res) {
    try {
      const { title, content } = req.body;
      const userId = req.user.id;
      const image = req.file ? req.file.filename : null;

      const data = { userId, title, content, image };
      const result = await FormValidators.postValidator().validateAsync(data);
      if (result.error) {
        return res.status(400).json({
          success: false,
          message: "Something went wrong.",
          result: [],
        });
      }
      // Save post to database
      const newPost = await Post.create({
        userId,
        title,
        content,
        imagePath: image,
      });

      return res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: newPost,
      });
    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  }

  async multiplePostCreation(req,res) {
    try {
      const postsData = JSON.parse(req.body.posts);
      if(req.files && req.files.length > 0){
        postsData.forEach((post,index) => {
          if(req.files[index]){
            post.imagePath = req.files[index].filename;
          }
        });
      }
      const {error} = FormValidators.createMultiplePostvalidator().validateAsync({posts:postsData})
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }

      // save all posts
      const createdPosts = await Post.bulkCreate(postsData)
      return res.status(201).json({
        success: true,
        message: "Posts created successfully",
        data: createdPosts,
      });
    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
  async createComment(req, res) {
    try {
      const { postId, comment } = req.body;
      const userId = req.user.id;

      const data = { userId, postId, comment };
      const result = await FormValidators.commentValidator().validateAsync(
        data
      );
      if (result.error) {
        return res.status(400).json({
          success: false,
          message: "Something went wrong.",
          result: [],
        });
      }
      const newComment = await Comment.create({ userId,postId,comment });
      return res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: newComment,
      });
    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  }

  async likePost(req, res) {}

  async getPostList(req,res){
    try {
      const userId = req.user.id;
      const postList = await Post.findAll({
        where : {userId : userId},
        // where : {
        //   userId :{
        //     [Op.eq] : userId
        //   }
        // }
        include : [
          {
            model : Comment,
            as : "postComments",
            attributes : ["comment","userId","createdAt"]
          }
        ]
      });

      return res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: postList,
      });
    } catch (error) {
       console.error("Login Error:", error);
        return res.status(500).json({
          success: false,
          message: "Server error",
          error: error.message,
        });
    }
  }
}

// Export single instance (common pattern)
export default new UserController();


/*
USER.findAll({
  attributes : ['name',[sequelize.fn('COUNT',sequelize.col('id')),'countId']]
})

USER.findAll({
  attributes : {
  exclude : ['password']
  })

USER.findAll({
  attributes : {
  include : [[sequalize.fn('COUNT',sequalize.col('id')),'countIds']]
  })

*/
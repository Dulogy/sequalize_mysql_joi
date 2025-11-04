import Joi from "joi";

class FormValidators {
  loginValidator(){
    return Joi.object({
      email: Joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required",
      }),
      password: Joi.string().min(6).required().messages({
        "string.min": "Password must be at least 6 characters long",
        "any.required": "Password is required",
      }),
    });
  }

  postValidator(){
    return Joi.object({
      userId: Joi.number()
        .integer()
        .required()
        .messages({
          "number.base": "User ID must be a number",
          "any.required": "User ID is required",
        }),

      image: Joi.any()
        .optional()
        .allow(null, "")
        .messages({
          "any.only": "Invalid image format",
        }),

      title: Joi.string()
        .min(3)
        .max(200)
        .required()
        .messages({
          "string.base": "Title must be a string",
          "string.empty": "Title cannot be empty",
          "string.min": "Title must be at least 3 characters",
          "string.max": "Title must be less than 200 characters",
          "any.required": "Title is required",
        }),
        content: Joi.string()
        .min(5)
        .required()
        .messages({
          "string.base": "Content must be a string",
          "string.empty": "Content cannot be empty",
          "string.min": "Content must be at least 5 characters long",
          "any.required": "Content is required",
        }),
    })
  }

  createMultiplePostvalidator(){
    return Joi.object({
      posts: Joi.array()
        .items(
          Joi.object({
            userId: Joi.number().integer().required().messages({
              "number.base": "User ID must be a number",
              "any.required": "User ID is required",
            }),
            title: Joi.string().min(3).max(100).required().messages({
              "string.base": "Title must be a string",
              "string.empty": "Title cannot be empty",
              "string.min": "Title must be at least 3 characters",
              "string.max": "Title must be less than 100 characters",
              "any.required": "Title is required",
            }),
            content: Joi.string().allow("").optional().messages({
              "string.base": "Content must be text",
            }),
            imagePath: Joi.string().allow(null, "").optional(),
          })
        )
        .min(1)
        .required()
        .messages({
          "array.base": "Posts must be an array",
          "array.min": "At least one post is required",
        }),
    });
  }

  commentValidator(){
    return Joi.object({
      userId : Joi.number().integer().required().messages({
        "number.base": "User ID must be a number",
        "any.required": "User ID is required"
      }),
      postId : Joi.number().integer().required().messages({
        "number.base": "Post ID must be a number",
        "any.required": "Post ID is required"
      }),
      comment : Joi.string().required().min(3).max(100).messages({
        "string.base": "Title must be a string",
        "string.empty": "Title cannot be empty",
        "string.min": "Title must be at least 3 characters",
        "string.max": "Title must be less than 200 characters",
        "any.required": "Title is required",
      }),
      content: Joi.string().allow("", null).messages({
        "string.base": "Content must be a string",
      }),
      imagePath: Joi.string().allow("", null).messages({
        "string.base": "Image path must be a string",
      }),
    })
  }

  likeValidator(){
    return Joi.object({
      userId : Joi.number().integer().required().messages({
        "number.base": "User ID must be a number",
        "any.required": "User ID is required"
      }),
      postId : Joi.number().integer().required().messages({
        "number.base": "Post ID must be a number",
        "any.required": "Post ID is required"
      }),
      isLike : Joi.boolean().required().messages({
        "any.required": "isLike is required"
      })
    })
  }
}

export default new FormValidators();
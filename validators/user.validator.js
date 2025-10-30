import joi from "joi";

class FormValidators {
  loginValidator(){
    return joi.object({
      email: joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required",
      }),
      password: joi.string().min(6).required().messages({
        "string.min": "Password must be at least 6 characters long",
        "any.required": "Password is required",
      }),
    });
  }

  postValidator(){
    return joi.object({
      userId: joi.number()
        .integer()
        .required()
        .messages({
          "number.base": "User ID must be a number",
          "any.required": "User ID is required",
        }),

      image: joi.any()
        .optional()
        .allow(null, "")
        .messages({
          "any.only": "Invalid image format",
        }),

      title: joi.string()
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
        content: joi.string()
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

  commentValidator(){
    return joi.object({
      userId : joi.number().integer().required().messages({
        "number.base": "User ID must be a number",
        "any.required": "User ID is required"
      }),
      postId : joi.number().integer().required().messages({
        "number.base": "Post ID must be a number",
        "any.required": "Post ID is required"
      }),
      comment : joi.string().required().min(3).max(100).messages({
        "string.base": "Title must be a string",
        "string.empty": "Title cannot be empty",
        "string.min": "Title must be at least 3 characters",
        "string.max": "Title must be less than 200 characters",
        "any.required": "Title is required",
      })
    })
  }
}

export default new FormValidators();
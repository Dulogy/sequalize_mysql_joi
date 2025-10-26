// controllers/user.controller.js
import  User  from "../model/user.model.js";

class UserController {
  // 🟢 User Login
  async login(req, res) {
    try {
      return res.status(200).json({
        message: "Login successful",
      });
    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  }

  // 🟢 Submit Answer
  async submitAnswer(req, res) {
    try {
      return res.status(200).json({
        message: "Answer submitted successfully",
        data: { questionId, answer },
      });
    } catch (error) {
      console.error("Submit Error:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  }
}

// Export single instance (common pattern)
export default new UserController();

import jwt from "jsonwebtoken";
class Authentication {
  async auth(req, res, next) {
    try {
      // Get token from headers
      const authHeader = req.header("Authorization");
      if (!authHeader) {
        return res.status(401).json({
          status: false,
          message: "No authorization header found",
        });
      }

      // Extract token
      const token = authHeader.replace("Bearer ", "").trim();
      if (!token) {
        return res.status(401).json({
          status: false,
          message: "No token provided",
        });
      }

      // Verify token
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (!decodedToken) {
        return res.status(401).json({
          status: false,
          message: "Invalid token",
        });
      }

      // Attach user info to request
      req.user = decodedToken;
      next();
    } catch (error) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized or invalid token",
        error: error.message,
      });
    }
  }
}

export default new Authentication();

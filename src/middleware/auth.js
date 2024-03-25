//Authentication and Authorization: Middleware can verify user authentication tokens,
//check user permissions, and restrict access to certain routes or resources.

import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";

  // Check if the token is present
  if (!token) {
    return res
      .status(401)
      .json({ message: "You cannot access this operation without a token!" });
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token provided!" });
    }

    // Attach the decoded user information to the request object
    req.user = decoded;
    // Move to the next middleware or route handler
    next();
  });
};

export default authMiddleware;

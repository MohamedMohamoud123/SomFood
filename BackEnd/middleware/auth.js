import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.log("Auth Error:", error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;

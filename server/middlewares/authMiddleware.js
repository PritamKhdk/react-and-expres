const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  if (!authHeader) {
    return res.status(400).json({ error: "Authorization header not provided" });
  }
  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    return res.status(400).json({ error: "Invalid token format" });
  }
  jwt.verify(token,  process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ error: "Failed to authenticate token" });
    } else {
      res.cookie("token", token, { httpOnly: true, secure: true });
      req.userId = decoded.idData;
      next();
    }
  });
};


module.exports = {  authenticateJWT };

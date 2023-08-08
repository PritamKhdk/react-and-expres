const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(400).json({ error: "Authorization header not provided" });
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res.status(400).json({ error: "Invalid token format" });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      const refreshToken = req.cookies.refreshToken;
      console.log("tokengot",refreshToken)
      // res.status(403).json({ error: "Token expired" });
      
      if (err.name === "TokenExpiredError") {
        jwt.verify(refreshToken, process.env.REFRESH, (err, decoded) => {
          if (err) {
            return res.status(403).json({ error: "Invalid token" });
          }
          const newAccessToken = jwt.sign(
            { idData: decoded.idData, timestamp: Date.now() }, 
            process.env.SECRET,
            { expiresIn: "1000s" }
          );
          res.cookie("token", newAccessToken, {
            httpOnly: true,
            secure: true
          });
          req.userId = decoded.idData;
          next();
        });
      } else {
        console.log(err);
        return res.status(401).json({ error: "Failed to authenticate token" });
      }
    } else {
      req.userId = decoded.idData;
      next();
    }
  });
};

module.exports = { authenticateJWT };

// const jwt = require("jsonwebtoken");
// require("dotenv").config();


// const authenticateJWT = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   if (!authHeader) {
//     return res.status(400).json({ error: "Authorization header not provided" });
//   }

//   const [bearer, token] = authHeader.split(" ");
//   if (bearer !== "Bearer" || !token) {
//     return res.status(400).json({ error: "Invalid token format" });
//   }

//   jwt.verify(token, process.env.SECRET, (err, decoded) => {
//     if (err) {
//       console.log(err);
//       return res.status(401).json({ error: "Failed to authenticate token" });
//     } else {
//       res.cookie("token", token, {
//         httpOnly: true,
//         secure: true
//       });
//       req.userId = decoded.idData;
//       next();
//     }
//   });
// };

// module.exports = { authenticateJWT};





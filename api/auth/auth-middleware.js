const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../secrets/secrets.js");


module.exports = (req, res, next) => {
  const { token } = req.headers;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if(err) {
        res.status(401).json({ message: "Token invalid" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Token required" });
  }
};
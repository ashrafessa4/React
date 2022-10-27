const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access Denied, no token Provided");
  try {
    const payload = jwt.verify(token, process.env.secretKey);
    req.payload = payload;
    next();
  } catch (error) {
    res.status(401).send("Invalid Token");
  }
};

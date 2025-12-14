const jwt = require("jsonwebtoken");
const SECRET = "secret123";

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Access denied");

  req.user = jwt.verify(token, SECRET);
  next();
};

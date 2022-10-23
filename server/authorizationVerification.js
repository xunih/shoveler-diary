const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("AUEHHTHETH HEADER")
  console.log(authHeader)
  
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log("TOOOKEEEN")
    console.log(token)
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      console.log("Authorised")
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { authenticateJWT };

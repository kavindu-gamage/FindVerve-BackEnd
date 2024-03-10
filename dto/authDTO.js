const jwt = require("jsonwebtoken");

const authDTO = {
  generateToken(user) {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
  },
};

module.exports = authDTO;

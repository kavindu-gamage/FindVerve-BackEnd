const jwt = require("jsonwebtoken");

const authMiddleWare = {
  verifyToken(req, res, next) {
    try {
      let token = req.headers["authorization"];

      if (!token) {
        return res.status(403).send("Access Denied");
      }

      if (token.startsWith("Bearer")) {
        token = token.slice(7, token.length).trim();
      } else {
        return res.status(403).send("Invalid Token Format");
      }

      const verified = jwt.verify(token, process.env.JWT.SECRET);
      req.user = verified;
      next();
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = authMiddleWare;

const { verify } = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken)
    return res.status(400).json({ error: "User not logged in" });

  try {
    const validToken = verify(accessToken, process.env.SECRET_ACCESS_TOKEN);

    req.user = validToken;

    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { validateToken };

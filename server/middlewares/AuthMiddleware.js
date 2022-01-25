const { verify } = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

const validateToken = (req, res, next) => {
  const accessToken = req.headers["accesstoken"];

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

const validateTemporalToken = (token) => {
  try {
    const validToken = verify(token, process.env.SECRET_ACCESS_TOKEN);

    if (validToken) {
      return validToken.email;
    }
  } catch (err) {
    return false;
  }
};

module.exports = { validateToken, validateTemporalToken };

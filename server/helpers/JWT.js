require("dotenv").config({ path: ".env" });
const { sign } = require("jsonwebtoken");

const createToken = (user) => {
  const accessToken = sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.SECRET_ACCESS_TOKEN
  );

  return accessToken;
};

module.exports = { createToken };

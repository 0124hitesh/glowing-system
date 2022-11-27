const jwt = require('jsonwebtoken')

const secretId = "shiv"
const generateToken = (id) => {
  return jwt.sign({ id }, secretId, {
    expiresIn: "30d",
  });
};

module.exports = {generateToken};
  
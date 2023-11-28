
const jwt = require('jsonwebtoken');
require("dotenv").config();

function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    // Add any other necessary user information to the payload
  };

  const token = jwt.sign(payload,process.env.JWT_SECRET, { expiresIn: '1h' }); // Change 'your_secret_key' to your actual secret key
  return token;
}


module.exports = {
  generateToken,
};

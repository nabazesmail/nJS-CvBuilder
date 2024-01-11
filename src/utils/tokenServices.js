// tokenService.js
function generateResetToken() {
  const tokenLength = 10; // You can adjust the length of the token as needed
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let resetToken = "";

  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    resetToken += characters.charAt(randomIndex);
  }

  return resetToken;
}

module.exports = { generateResetToken };

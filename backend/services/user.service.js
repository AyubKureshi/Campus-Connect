const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
}

module.exports.comparePassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
}

module.exports.generateAuthToken = (userId) => {
  const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, {expiresIn: '24h'});
  return token;
}

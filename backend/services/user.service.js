const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports.hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
}

module.exports.comparePassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
}

module.exports.generateAuthToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
  return token;
}

module.exports.createUser = async ({firstName, lastName, email, password}) => {
  if(!firstName || !email || !password) {
    throw new Error('All fields are required');
  }
  const hashedPassword = await this.hashPassword(password);
  const user = await User.create({
    fullName: {
      firstName, lastName
    }, 
    email, 
    password: hashedPassword
  });

  return user;
}

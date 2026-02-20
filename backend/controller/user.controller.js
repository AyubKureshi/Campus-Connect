const User = require('../models/user.model');
const userService = require('../services/user.service');

module.exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({email}).select('+password');
  if(!user) {
    return res.status(400).json({message: "Invalid email or password"});
  }

  const isMatched = await userService.comparePassword(password, user.password);
  if(!isMatched) {
    return res.status(400).json({message: "Invalid email or password"});
  }

  const token = userService.generateAuthToken(user);
  user.password = undefined;

  return res.status(200).json({ message: "Login successfully", token, user });
}

module.exports.postRegister = async (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if(password !== confirmPassword) {
    return res.status(400).json({ message: "Password and confirm password must be same" });
  }

  const isUserAlreadyExist = await User.findOne({email});
  if(isUserAlreadyExist) {
      return res.status(400).json({message: 'User already exist'});
  }

  const newUser = await userService.createUser({ firstName, lastName, email, password });
  return res.status(201).json({ message: "Registration Successful", newUser });
}

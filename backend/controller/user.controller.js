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
  const token = userService.generateAuthToken(newUser);
  newUser.password = undefined;
  return res.status(201).json({ message: "Registration Successful", user: newUser, token });
}

module.exports.getCurrentUser = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ user });
};

module.exports.updateCurrentUser = async (req, res, next) => {
  const { displayName, location, github, linkedin, skills } = req.body;

  const updatePayload = {};

  if (typeof displayName === "string") {
    const parts = displayName.trim().split(/\s+/).filter(Boolean);
    const [firstName = "", ...rest] = parts;
    updatePayload.fullName = {
      firstName: firstName || "User",
      lastName: rest.join(" "),
    };
  }

  if (typeof location === "string") {
    updatePayload.location = location.trim();
  }

  if (typeof github === "string") {
    const githubValue = github.trim();
    updatePayload.github = githubValue || undefined;
  }

  if (typeof linkedin === "string") {
    const linkedinValue = linkedin.trim();
    updatePayload.linkedin = linkedinValue || undefined;
  }

  if (Array.isArray(skills)) {
    updatePayload.skills = skills
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  const user = await User.findByIdAndUpdate(req.user.id, updatePayload, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ message: "Profile updated", user });
};

const { projectSchema } = require("./project.validator");

const validateProject = (req, res, next) => {
  const { error } = projectSchema.validate({ project: req.body });

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  next();
};

module.exports = validateProject;
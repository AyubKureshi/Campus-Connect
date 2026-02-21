const Joi = require("joi");

const projectSchema = Joi.object({
  project: Joi.object({
    title: Joi.string()
      .min(5)
      .max(100)
      .required(),

    description: Joi.string()
      .min(20)
      .required(),

    domain: Joi.string()
      .required(),

    techStack: Joi.array()
      .items(Joi.string())
      .min(1)
      .required(),

    requiredSkills: Joi.array()
      .items(Joi.string())
      .min(1)
      .required(),

    maxTeamSize: Joi.number()
      .integer()
      .min(1)
      .max(20)
      .required(),

    status: Joi.string()
      .valid("open", "in-progress", "completed", "closed")
      .default("open"),

    user: Joi.string().optional() 
  }).required()
});

module.exports = { projectSchema };
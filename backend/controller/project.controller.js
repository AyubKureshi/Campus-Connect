const Project = require("../models/project.model");


// Get all projects
exports.getAllProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

// Create new project
exports.createProject = async (req, res) => {
  const { title, description, domain, techStack, requiredSkills, maxTeamSize, status } = req.body;

  const newProject = new Project({ 
    title, description, domain, techStack, requiredSkills, maxTeamSize, status, userId: req.user.id || req.user._id 
  });
  
  const savedProject = await newProject.save();

  res.status(201).json({
    message: "Project created successfully",
    project: savedProject,
  });
};

// Get single project
exports.getSingleProject = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.json(project);
};

exports.getUserProjects = async (req, res) => {
  const { userId } = req.user.id;

  const projects = await Project.find({ user: userId });

  if (!projects.length) {
    return res.status(404).json({
      message: "No projects found for this user"
    });
  }

  res.json(projects);
};
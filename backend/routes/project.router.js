const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync");
const projectController = require("../controller/project.controller");
const validateProject = require("../validators/validateProject");

// GET all projects
router.get("/", wrapAsync(projectController.getAllProjects));

// CREATE project
router.post("/", validateProject, wrapAsync(projectController.createProject));

// GET single project
router.get("/:id", wrapAsync(projectController.getSingleProject));

module.exports = router;

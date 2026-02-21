const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync");
const projectController = require("../controller/project.controller");
const validateProject = require("../validators/validateProject");
const {authUser} = require('../middleware/auth.middleware');

// GET all projects
router.get("/", wrapAsync(projectController.getAllProjects));

// CREATE project
router.post("/create-project", authUser, validateProject, wrapAsync(projectController.createProject));

// GET single project
router.get("/:id", wrapAsync(projectController.getSingleProject));


module.exports = router;

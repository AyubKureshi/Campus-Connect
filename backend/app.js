const express = require("express");
const wrapAsync = require("../backend/utils/wrapasync.js");
const connectToDb = require("./db/dbConnect");
const cors = require("cors");
const Project = require("./models/project.model.js");
const app = express();
connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => {
  res.send("<h1>Hello App</h1>");
});
// here user will get to see all details
app.get(
  "/projects",
  wrapAsync(async (req, res) => {
    const Projects = await Project.find();
    res.send(Projects);
  }),
);
// taking user details from frontend and adding to backend
app.post(
  "/projects",
  wrapAsync(async (req, res) => {
    const newProject = new Project(req.body);
    let result = await newProject.save();
    console.log(result);
    res.json({ message: "This is user route" });
  }),
);
//like here we are taking form from frontend and edit it here just updating it to backend
app.get("/projects/:id", (req, res) => {
  res.json({message:"Hii fine"});
});
// we will add onclic event and get id from it and delete from backend
app.delete("/projects/:id", (req, res) => {
  res.send("this is for deleting");
});

module.exports = app;

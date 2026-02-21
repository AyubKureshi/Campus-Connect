const express = require("express");
const connectToDb = require("./db/dbConnect");
const cors = require("cors");

const projectRouter = require("./routes/project.router");
const userRouter = require("./routes/user.router");

const app = express();
connectToDb();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Root Route
app.get("/", (req, res) => {
  res.send("<h1>Hello App</h1>");
});

// Routes
app.use("/users", userRouter);
app.use("/projects", projectRouter);

module.exports = app;
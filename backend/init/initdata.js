const mongoose = require("mongoose");
const User = require("../models/user.model.js");
const Project = require("../models/project.model.js");

mongoose.connect("mongodb://127.0.0.1:27017/campus");

const initDB = async () => {
  try {
    // Clear old data (optional)
    await User.deleteMany({});
    await Project.deleteMany({});

    // Create User
    const user = await User.create({
      fullName: {
        firstName: "Rahul",
        lastName: "Dev"
      },
      email: "rahul@example.com",
      password: "12345678", // temporary (no hashing for now)
      skills: ["React", "Node"],
      github: "https://github.com/rahul",
      linkedin: "https://linkedin.com/in/rahul",
      role: "student",
      collaborationStatus: "open"
    });

    console.log("User Created:", user._id);

    // Create Projects using created userId
    const projects = [
      {
        userId: user._id,
        title: "AI Resume Analyzer",
        description: "AI tool to analyze resumes.",
        domain: "AI",
        techStack: ["React", "Node.js"],
        requiredSkills: ["Machine Learning"],
        maxTeamSize: 4,
        status: "open"
      },
      {
        userId: user._id,
        title: "Campus Event Manager",
        description: "Platform to manage events.",
        domain: "Web",
        techStack: ["MERN"],
        requiredSkills: ["UI/UX"],
        maxTeamSize: 5,
        status: "open"
      },
      {
        userId: user._id,
        title: "Blockchain Voting System",
        description: "Secure decentralized voting.",
        domain: "Blockchain",
        techStack: ["Solidity"],
        requiredSkills: ["Smart Contracts"],
        maxTeamSize: 3,
        status: "in-progress"
      },
      {
        userId: user._id,
        title: "Chat Application",
        description: "Real-time messaging app.",
        domain: "Communication",
        techStack: ["Socket.io"],
        requiredSkills: ["Backend"],
        maxTeamSize: 3,
        status: "open"
      },
      {
        userId: user._id,
        title: "Fitness Tracker",
        description: "Track workouts and health.",
        domain: "Health",
        techStack: ["React Native"],
        requiredSkills: ["Mobile Dev"],
        maxTeamSize: 4,
        status: "completed"
      },
      {
        userId: user._id,
        title: "E-learning Platform",
        description: "Online learning system.",
        domain: "EdTech",
        techStack: ["React"],
        requiredSkills: ["Frontend"],
        maxTeamSize: 6,
        status: "open"
      },
      {
        userId: user._id,
        title: "Crypto Tracker",
        description: "Track crypto investments.",
        domain: "Finance",
        techStack: ["Next.js"],
        requiredSkills: ["API Integration"],
        maxTeamSize: 4,
        status: "open"
      },
      {
        userId: user._id,
        title: "Travel Planner",
        description: "Collaborative travel planning.",
        domain: "Travel",
        techStack: ["React"],
        requiredSkills: ["UI/UX"],
        maxTeamSize: 3,
        status: "open"
      },
      {
        userId: user._id,
        title: "Portfolio Builder",
        description: "Build developer portfolios.",
        domain: "Web",
        techStack: ["MERN"],
        requiredSkills: ["Frontend"],
        maxTeamSize: 2,
        status: "closed"
      },
      {
        userId: user._id,
        title: "AI Chatbot",
        description: "NLP-based chatbot.",
        domain: "AI",
        techStack: ["Python"],
        requiredSkills: ["Deep Learning"],
        maxTeamSize: 5,
        status: "open"
      }
    ];

    await Project.insertMany(projects);

    console.log("10 Projects Inserted Successfully");
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

initDB();
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    }, 
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        trim: true
    },
    techStack: [{
        type: String,
        trim: true
    }],
    requiredSkills: [{
        type: String,
        trim: true
    }],
    maxTeamSize: {
        type: Number,
        default: 5
    },
    status: {
        type: String,
        enum: ["open", "in-progress", "completed", "closed"],
        default: "open"
    },
});

module.exports = mongoose.model("Project", projectSchema);

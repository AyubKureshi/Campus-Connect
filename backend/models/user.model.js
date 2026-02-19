const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String, 
            required: true,
            trim: true, 
            minLength: [3, 'First name must be atleat 3 character long'], 
        }, 
        lastName: {
            type: String, 
            trim: true, 
            minLength: [3, 'Last name must be atleat 3 character long'], 
        }, 
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String, 
        required: true, 
        minLength: [8, 'Password must be atleast 8 character long'], 
        select: false, 
    },
    skills: [{
        type: String,
        trim: true
    }],
    github: { 
        type: String, 
        unique: true 
    }, 
    linkedin: { 
        type: String, 
        unique: true 
    }, 
    role: {
        type: String,
        enum: ["student", "admin"],
        default: "student"
    },
    collaborationStatus: {
        type: String,
        enum: ["open", "seeking", "building", "not-available"],
        default: "open"
    },
});

module.exports = mongoose.model("User", userSchema);

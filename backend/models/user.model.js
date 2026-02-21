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
    location: {
        type: String,
        trim: true,
        default: ""
    },
    github: { 
        type: String,
        trim: true,
        default: undefined,
        set: (value) => (value == null || value === "" ? undefined : value),
    }, 
    linkedin: { 
        type: String,
        trim: true,
        default: undefined,
        set: (value) => (value == null || value === "" ? undefined : value),
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

userSchema.index(
    { github: 1 },
    {
        unique: true,
        partialFilterExpression: { github: { $type: "string" } },
    },
);

userSchema.index(
    { linkedin: 1 },
    {
        unique: true,
        partialFilterExpression: { linkedin: { $type: "string" } },
    },
);

module.exports = mongoose.model("User", userSchema);

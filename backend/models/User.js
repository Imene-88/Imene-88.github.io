const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    type_of_color_blindness: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    profile_picture: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
    birth_date: {
        type: Date,
        default: Date.now,
    }, 
    account_type: {
        type: String,
        default: "basic",
    },
    followers: {
        type: Array,
        default: [],
    },
    following: {
        type: Array,
        default: [],
    }, 
    activated: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        default: "User",
    }
},
{timestamps: true}
);

module.exports = mongoose.model("User", userSchema);
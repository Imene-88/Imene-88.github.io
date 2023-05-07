const mongoose = require('mongoose');

const userInterestsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    interests: {
        type: Array,
        default: [],
    },
    birth_date:{
        type: Date,
        required: true,
    }
},
{timestamps: true}
);

module.exports = mongoose.model("UserInterests", userInterestsSchema);
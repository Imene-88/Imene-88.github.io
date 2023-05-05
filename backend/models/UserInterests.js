const mongoose = require('mongoose');

const userInterestsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    interests: {
        type: Array,
        default: [],
    }
},
{timestamps: true}
);

module.exports = mongoose.model("UserInterests", userInterestsSchema);
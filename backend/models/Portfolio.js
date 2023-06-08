const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    full_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    list_of_works: {
        type: Array,
        default: [],
    },
},
{timestamps: true},
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
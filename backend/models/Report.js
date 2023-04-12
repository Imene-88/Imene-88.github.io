const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    checked_answer: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    report_type: {
        type: String,
    },
},
{timestamps: true},
);

module.exports = mongoose.model('Report', reportSchema);
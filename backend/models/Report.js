const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver_id: {
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
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    reported_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    report_type: {
        type: String,
    }
},
{timestamps: true},
);

module.exports = mongoose.model('Report', reportSchema);
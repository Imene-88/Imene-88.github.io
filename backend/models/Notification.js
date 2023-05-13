const mongoose = require('mongoose'); 

const notificationSchema = new mongoose.Schema({
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
    type: {
        type: String,
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    document_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document",
    },
    read: {
        type: Boolean,
        default: false,
    }
},
{timestamps: true}
);

module.exports = mongoose.model("Notification", notificationSchema);
const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    open_document_id: {
        type: mongoose.Schema.Types.String,
        ref: "Document",
    },
},
{timestamps: true},
);

module.exports = mongoose.model("Like", likeSchema);
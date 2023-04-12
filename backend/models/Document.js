const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        default: "Untitled document",
    },
    content: {
        type: Object,
    },
    open: {
        type: Boolean,
        default: false,
    }, 
    description: {
        type: String,
    }
},
{timestamps: true},
);

module.exports = mongoose.model("Documents", documentSchema);
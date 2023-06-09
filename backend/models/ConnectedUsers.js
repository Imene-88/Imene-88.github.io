const mongoose = require('mongoose');

const connectedUersSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    socket_id: {
        type: String,
        required: true,
    },
},
{timestamps: true},
);

module.exports = mongoose.model("ConnectedUsers", connectedUersSchema);
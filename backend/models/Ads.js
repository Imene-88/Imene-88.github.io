const mongoose = require('mongoose');

const adsSchema = new mongoose.Schema({
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
    },
    image: {
        type: String,
    },
    video: {
        type: String,
    },
    target_audience: {
        type: String,
    }
},
{timestamps: true}
);

module.exports = mongoose.model("Ads", adsSchema);
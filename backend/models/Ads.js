const mongoose = require('mongoose');

const adsSchema = new mongoose.Schema({
    owner_id: {
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
        type: Array,
        default: [],
    },
    postType: {
        type: String,
        default: "Ad",
    }
},
{timestamps: true}
);

module.exports = mongoose.model("Ads", adsSchema);
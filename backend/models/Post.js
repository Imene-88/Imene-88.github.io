const mongoose = require('mongoose'); 

const postSchema = new mongoose.Schema({
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
    postType: {
        type: String,
        default: "Post",
    }
},
{timestamps: true}
);

module.exports = mongoose.model("Post", postSchema);
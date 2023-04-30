const mongoose = require('mongoose'); 

const savedPostSchema = new mongoose.Schema({
    user_id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User",
       required: true,
    },
    post_id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Post",
       required: true,
    },
},
{timestamps: true}
);

module.exports = mongoose.model("SavedPosts", savedPostSchema);
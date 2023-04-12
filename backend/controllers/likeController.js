const LikeModel = require("../models/Like");
const UserModel = require("../models/User");
const PostModel = require("../models/Post");

exports.likePost = async (req, res) => {
    try {
        const like = new LikeModel({
            user_id: req.body.userId,
            post_id: req.params.id,
        });
        await like.save();
        res.status(200).json(like);
    }
    catch(error) {
        console.log(error);
    }
};

exports.unlikePost = async (req, res) => {
    try {
        const like = await LikeModel.findOne({post_id: req.params.id, user_id: req.body.userId});
        await LikeModel.findByIdAndDelete(like._id);
        res.status(200).json("like deleted successfully");
    }
    catch(error) {
        console.log(error);
    }
};
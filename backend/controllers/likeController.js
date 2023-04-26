const LikeModel = require("../models/Like");
const UserModel = require("../models/User");
const PostModel = require("../models/Post");

exports.likePost = async (req, res) => {
    const like = LikeModel.findOne({user_id: req.body.userId, post_id: req.params.id});
    if (like) {
        return;
    } else {
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
    }
};

exports.likeOpenDocument = async (req, res) => {
    const like = LikeModel.findOne({user_id: req.body.userId, open_document_id: req.params.id});
    if (like) {
        return;
    } else {
        try {
            const like = new LikeModel({
                user_id: req.body.userId,
                open_document_id: req.params.id,
            });
            await like.save();
            res.status(200).json(like);
        }
        catch(error) {
            console.log(error);
        }
    }
};

exports.unlikePost = async (req, res) => {
    const like = LikeModel.findOne({user_id: req.body.userId, post_id: req.params.id});
    if (like) {
        try {
            const like = await LikeModel.findOne({post_id: req.params.id, user_id: req.body.userId});
            await LikeModel.findByIdAndDelete(like._id);
            res.status(200).json("like deleted successfully");
        }
        catch(error) {
            console.log(error);
        }
    } else {
        return;
    }
};

exports.unlikeOpenDocument = async (req, res) => {
    const like = LikeModel.findOne({user_id: req.body.userId, open_document_id: req.params.id});
    if (like) {
        try {
            const like = await LikeModel.findOne({open_document_id: req.params.id, user_id: req.body.userId});
            await LikeModel.findByIdAndDelete(like._id);
            res.status(200).json("like deleted successfully");
        }
        catch(error) {
            console.log(error);
        }
    } else {
        return;
    }
};
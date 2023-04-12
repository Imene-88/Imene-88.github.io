const PostModel = require("../models/Post");
const UserModel = require("../models/User");
const LikeModel = require("../models/Like");

exports.createPost = async (req, res) => {
    try {
        const post = new PostModel({
            owner_id: req.body.owner_id,
            content: req.body.content,
            image: req.body.image,
            video: req.body.video,
        });
        await post.save();
        res.status(200).json(post);
    }
    catch(error) {
        console.error(error);
    }
};

exports.getFeed = async (req, res) => {
    try {
        const thisUser = await UserModel.findById(req.params.userId);
        const thisUsersPosts = await PostModel.find({owner_id: thisUser._id});
        const followedUsersPosts = await Promise.all(
            thisUser.following.map((followedUser) => {
                return PostModel.find({owner_id: followedUser});
            })
        );
        const feedContent = [...thisUsersPosts, ...followedUsersPosts.flat()];
        res.status(200).json(feedContent);
    }
    catch(error) {
        console.error(error);
    }
};

exports.updatePost = async (req, res) => {
    try {
        const post = await PostModel.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        res.status(200).json("post info updated successfully");
    }
    catch(error) {
        console.error(error);
    }
};

exports.deletePost = async function(req, res) {
    try {
        await PostModel.findByIdAndDelete(req.params.id);
        res.status(200).json("post deleted successfully");
    }
    catch(error) {
        console.error(error);
    }
};

exports.getPost = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        res.status(200).json(post);
    }
    catch(error) {
        console.error(error);
    }
};

exports.getMyPosts = async (req, res) => {
    try {
        const thisUsersPosts = await PostModel.find({owner_id: req.params.id});
        res.status(200).json(thisUsersPosts);
    }
    catch(error) {
        console.error(error);
    }
};

exports.getLikesCount = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        const likesCount = await LikeModel.countDocuments({post_id: post._id});
        res.json(likesCount);
    }
    catch(error) {
        console.log(error);
    }
};


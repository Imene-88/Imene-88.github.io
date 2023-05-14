const LikeModel = require("../models/Like");
const UserModel = require("../models/User");
const PostModel = require("../models/Post");
const documentModel = require("../models/Document");
var axios = require("axios");

exports.likePost = async (req, res) => {
    const like = await LikeModel.findOne({user_id: req.body.userId, post_id: req.params.id});
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
            const post = await PostModel.findById(req.params.id);
            const postOwner = post.owner_id;
            const user = await UserModel.findById(req.body.userId);
            axios.post(
                'https://api.engagespot.co/v3/notifications',
                {
                  notification: {
                    title: `${user.username} liked your post`,
                    Image: user.profile_picture,
                  },
                  recipients: [postOwner],
                },
                {
                  headers: {
                    'X-ENGAGESPOT-API-KEY': '392669pd2q63zp1n10mrub',
                    'X-ENGAGESPOT-API-SECRET': process.env.ENGAGESPOT_API_SECRET,
                  },
                }
              );
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
            const document = await documentModel.findById(req.params.id);
            const documentOwner = document.owner_id;
            const user = await UserModel.findById(req.body.userId);
            axios.post(
                'https://api.engagespot.co/v3/notifications',
                {
                  notification: {
                    title: `${user.username} liked your post`,
                  },
                  recipients: [documentOwner],
                },
                {
                  headers: {
                    'X-ENGAGESPOT-API-KEY': '392669pd2q63zp1n10mrub',
                    'X-ENGAGESPOT-API-SECRET': process.env.ENGAGESPOT_API_SECRET,
                  },
                }
              );
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

exports.getLike = async (req, res) => {
    try {
        const like = await LikeModel.find({ user_id: req.params.userId, post_id: req.params.postId });
        res.status(200).json(like);
    } 
    catch (error) {
        console.log(error);
    }
}; 
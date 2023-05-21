const PostModel = require("../models/Post");
const UserModel = require("../models/User");
const LikeModel = require("../models/Like");
const CommentModel = require("../models/Comment");
const SavedPostModel = require("../models/SavedPosts");

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
        if (post) {
            const likesCount = await LikeModel.countDocuments({post_id: post._id});
            res.status(200).json(likesCount);
        } else {
            return;
        }
    }
    catch(error) {
        console.log(error);
    }
};

exports.getCommentsCount = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        const commentsCount = await CommentModel.countDocuments({post_id: post._id});
        res.status(200).json(commentsCount);
    } 
    catch (error) {
        console.log(error);
    }
};

exports.savePost = async (req, res) => {
    const savedPost = await SavedPostModel.findOne({user_id: req.params.userId, post_id: req.params.postId});
    if (savedPost) {
        return;
    } else {
        try {
            const savedPost = new SavedPostModel({
                user_id: req.params.userId,
                post_id: req.params.postId,
            });
            await savedPost.save();
            res.status(200).json(savedPost);
        }
        catch(error) {
            console.log(error);
        }
    }
};

exports.unsavePost = async (req, res) => {
    const savedPost = await SavedPostModel.findOne({ user_id: req.params.userId, post_id: req.params.postId });
    if (savedPost) {
        try {
            await SavedPostModel.findByIdAndDelete(savedPost._id);
            res.status(200).json("post unsaved successfully");
        }
        catch(error) {
            console.log(error);
        }
    } else {
        return;
    }
}

exports.getSavedPosts = async (req, res) => {
    try {
      const savedPosts = await SavedPostModel.find({ user_id: req.params.userId });
      res.status(200).json(savedPosts);  
    } 
    catch (error) {
        console.log(error);
    }
};

exports.getSavedPost = async (req, res) => {
    try {
        const savedPost = await SavedPostModel.find({ user_id: req.params.userId, post_id: req.params.postId });
        res.status(200).json(savedPost);  
      } 
      catch (error) {
          console.log(error);
      }
}; 
const PostModel = require("../models/Post");
const UserModel = require("../models/User");
const LikeModel = require("../models/Like");
const CommentModel = require("../models/Comment");
const SavedPostModel = require("../models/SavedPosts");
const UserInterestsModel = require('../models/UserInterests');
const AdsModel = require("../models/Ads");

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
        const userInterersts = await UserInterestsModel.findOne({user_id: thisUser._id});
        const ads = await AdsModel.find({});
        const followedUsersPosts = await Promise.all(
            thisUser.following.map((followedUser) => {
                return PostModel.find({owner_id: followedUser});
            })
        );
        const removeDuplicates = (givenArray) => {
            const arrayFiltered = new Set(givenArray);
            const uniqueValuesArray = Array.from(arrayFiltered);
            return uniqueValuesArray;
        }
        let interestingAds = [];
        userInterersts.interests.map((interest) => {
            if (interest === "Fiction Writing" || interest === "Short Story" || interest === "Novel") {
                interestingAds.push("Novelists");
            } else if (interest === "ScreenWriting") {
                interestingAds.push("Screenwriters");
            } else if (interest === "Playwriting") {
                interestingAds.push("Playwrights");
            } else if (interest === "Poetry") {
                interestingAds.push("Poets");
            } else if (interest === "Blogging") {
                interestingAds.push("Bloggers");
            } else if (interest === "Copywriting") {
                interestingAds.push("Copywriters");
            } else if (interest === "Non-Fiction") {
                interestingAds.push("Non-fiction writers");
            } else if (interest === "Technical Writing") {
                interestingAds.push("Technical writers");
            } else if (interest === "Academic Writing") {
                interestingAds.push("Academic writers");
            } else if (interest === "Journalism") {
                interestingAds.push("Journalists");
            } else if (interest === "Editing") {
                interestingAds.push("Editors");
            } else if (interest === "Freelance Writing") {
                interestingAds.push("Freelance writers");
            } else if (interest === "Publishing") {
                interestingAds.push("Publishers");
            }
        })
        const uniqueInterestingAds = removeDuplicates(interestingAds);
        const allWritersAds = ads.filter((ad) => ad.target_audience.includes("All writers"));
        let specificAds = [];
        let isIncluded;
        ads.map((ad) => {
            isIncluded = uniqueInterestingAds.some(item => ad.target_audience.includes(item));
            if (isIncluded) {
                if (!specificAds.includes(ad)) {
                    specificAds.push(ad);
                }
            }
        });
        const feedContent = [...thisUsersPosts, ...followedUsersPosts.flat(), ...allWritersAds, ...specificAds];
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
        if (post) {
            const commentsCount = await CommentModel.countDocuments({post_id: post._id});
            res.status(200).json(commentsCount);
        } else {
            return;
        }
        
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
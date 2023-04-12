const UserModel = require("../models/User");
const PostModel = require("../models/Post");
const bcrypt = require("bcrypt");

exports.updateUser = async (req, res) => {
    if(req.body.password) {
        try {
            const salt = await bcrypt.genSalt();
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        catch(error) {
            console.error(error); 
        }
    }
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        res.status(200).json("user info updated successfully");
    }
    catch(error) {
        console.error(error);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Account deleted successfully");
    } 
    catch(error) {
        console.log(error);
    }
};

exports.getUser = async (req, res) => {
    try {
        const userId = req.query.id;
        const fullname = req.query.fullname;
        const user = userId ? await UserModel.findById(userId) : await UserModel.findOne({full_name: fullname});
        const {typeOfColorBlindness,password,accountType, ...other} = user._doc;
        res.status(200).json(other);
    }
    catch(error) {
        console.log(error);
    }
};

exports.gelAllUsers = async (req, res) => {
    try {
        const usersList = await UserModel.find();
        res.status(200).json(usersList);
    }
    catch(error) {
        console.log(error);
    }
};

exports.followUser = async (req, res) => {
    try {
        const followedUser = await UserModel.findById(req.params.id);
        const thisUser = await UserModel.findById(req.body.userId);
        await followedUser.updateOne({$push: {followers: thisUser}});
        await thisUser.updateOne({$push: {following: followedUser}});
        res.status(200).json("User followed successfully");
    }
    catch(error) {
        console.log(error);
    }
};

exports.unfollowUser = async (req, res) => {
    try {
        {/* const unfollowedUser = await UserModel.findById(req.params.id);
        const thisUser = await UserModel.findById(req.body.userId);
        await unfollowedUser.updateOne({$pull: {followers: {$in: [req.body.userId]}}});
        await thisUser.updateOne({$pull: {following: {$in: [req.params.id]}}}); */}
        const unfollowedUser = await UserModel.findById(req.params.id);
        const thisUser = await UserModel.findById(req.body.userId);
        const index = thisUser.following.indexOf(unfollowedUser);
        thisUser.following.splice(index, 1);
        const index2 = unfollowedUser.followers.indexOf(thisUser);
        unfollowedUser.followers.splice(index2, 1);
        await unfollowedUser.save();
        await thisUser.save(); 
        res.status(200).json("User unfollowed successfully"); 
    }
    catch(error) {
        console.log(error);
    }
};

exports.getUserPosts = async (req, res) => {
    try {
        const user = await UserModel.findOne({full_name: req.params.fullname});
        const userPosts = await PostModel.find({owner_id: user._id});
        res.status(200).json(userPosts);
    }
    catch(error) {
        console.log(error);
    }
};



const UserModel = require("../models/User");
const PostModel = require("../models/Post");
const bcrypt = require("bcrypt");
const axios = require("axios");

exports.updateUser = async (req, res) => {
    if(req.body.password) {
        try {
            const salt = await bcrypt.genSalt();
            req.body.password = await bcrypt.hash(req.body.password, salt);
            await UserModel.findByIdAndUpdate(req.params.id, {
                full_name: req.body.full_name,
                username: req.body.username,
                type_of_color_blindness: req.body.type_of_color_blindness,
                email: req.body.email,
                password: req.body.password,
                bio: req.body.bio,
                profile_picture: req.body.profile_picture,
                birth_date: new Date(req.body.birth_date),
                account_type: req.body.account_type,
                activated: req.body.activated,
                role: req.body.role
            });
            res.status(200).json("User info updated successfully");
        }
        catch(error) {
            console.error(error); 
        }
    } else {
        try {
            await UserModel.findByIdAndUpdate(req.params.id, {
                full_name: req.body.full_name,
                username: req.body.username,
                type_of_color_blindness: req.body.type_of_color_blindness,
                email: req.body.email,
                bio: req.body.bio,
                profile_picture: req.body.profile_picture,
                birth_date: new Date(req.body.birth_date),
                account_type: req.body.account_type,
                activated: req.body.activated,
                role: req.body.role
            });
            res.status(200).json("User info updated successfully");
        } 
        catch (error) {
            console.log(error);
        }
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

exports.getSender = async (userId) => {
    try {
        const user = await UserModel.findById(userId);
        return user;
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
        axios.post(
            'https://api.engagespot.co/v3/notifications',
            {
              notification: {
                title: `${thisUser.username} followed you`,
                icon: thisUser.profile_picture,
              },
              recipients: [followedUser._id],
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

exports.getUserFollowings = async (req, res) => {
    try {
        const thisUser = await UserModel.findById(req.params.id);
        const userFollowings = await Promise.all(
            thisUser.following.map((followedUser) => {
                return UserModel.findById(followedUser._id);
            })
        );

        const userFollowingsReduced = userFollowings.slice(0, 7);
       
        const usefulInformation = userFollowingsReduced.map((followedUser) => {
            const {type_of_color_blindness,email,password,accountType,birth_date, ...other} = followedUser._doc;
            return other;
        })
        res.status(200).json(usefulInformation);
    }
    catch(error) {
        console.log(error);
    }
};

exports.getUserFollowing = async (req, res) => {
    try {
        const thisUser = await UserModel.findById(req.params.userId);
        const thisUserFollowing = thisUser.following.filter((user) => user._id !== req.params.userFollowingId); 
        res.status(200).json(thisUserFollowing);
    } 
    catch (error) {
        console.log(error);
    }
};

exports.getUserPostsCount = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        const postsCount = await PostModel.countDocuments({owner_id: user._id});
        res.json(postsCount);
    }
    catch(error) {
        console.log(error);
    }
};

exports.searchUser = async (req, res) => {
    try {
        const query = req.query.q;
        const user = await UserModel.find({
            $or: [
                { full_name: { $regex: query, $options: 'i' } },
                { username: { $regex: query, $options: 'i' } }
            ]
        });
        res.status(200).json(user);    
    } 
    catch (error) {
        console.log(error);
    }
};
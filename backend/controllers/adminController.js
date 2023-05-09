const UserModel = require('../models/User');
const PostModel = require('../models/Post');
const DocumentModel = require('../models/Document');
const LikeModel = require('../models/Like');
const CommentModel = require('../models/Comment');

exports.calcTotalDocumentsInCollections = async (req, res) => {
    let totalDocuments = [];
    try {
        const users = await UserModel.countDocuments({role: "User"});
        const posts = await PostModel.countDocuments({});
        const openDocuments = await DocumentModel.countDocuments({open: true});
        const documents = await DocumentModel.countDocuments({open: false});
        const likes = await LikeModel.countDocuments({});
        const comments = await CommentModel.countDocuments({});
        totalDocuments.push(users, posts, openDocuments, documents, likes, comments);
        res.status(200).json(totalDocuments);
    } 
    catch (error) {
        console.log(error);
    }
};

exports.getRecentUsers = async (req, res) => {
    try {
        const recentUsers = await UserModel.find({role: {$ne: "Admin"}}, null, {sort: {createdAt: -1}, limit: 4});
        res.status(200).json(recentUsers);    
    } 
    catch (error) {
        console.log(error);
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({role: "User"});
        res.status(200).json(users);
    } 
    catch (error) {
        console.log(error);
    }
};

exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await UserModel.find({role: "Admin"});
        res.status(200).json(admins);
    } 
    catch (error) {
        console.log(error);
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find({});
        res.status(200).json(posts);
    } 
    catch (error) {
        console.log(error);
    }
};

exports.getLikeUsers = async (req, res) => {
    let users = [];
    try {
        const likes = await LikeModel.find({ post_id: req.params.postId });
        for (let i = 0; i < likes.length; i++) {
            users[i] = likes[i].user_id;
        };
        res.status(200).json(users);
    } 
    catch (error) {
        console.log(error);
    }
};
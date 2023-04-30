const UserModel = require('../models/User');
const PostModel = require('../models/Post');
const DocumentModel = require('../models/Document');
const LikeModel = require('../models/Like');

exports.calcTotalDocumentsInCollections = async (req, res) => {
    let totalDocuments = [];
    try {
        const users = await UserModel.countDocuments({});
        const posts = await PostModel.countDocuments({});
        const documents = await DocumentModel.countDocuments({open: true});
        const likes = await LikeModel.countDocuments({});
        totalDocuments.push(users - 1, posts, documents, likes);
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
        const users = await UserModel.find({role: {$ne: "Admin"}});
        res.status(200).json(users);
    } 
    catch (error) {
        console.log(error);
    }
};
const CommentModel = require('../models/Comment');

exports.createComment = async (req, res) => {
    try {
        const comment = new CommentModel({
            user_id: req.params.userId,
            post_id: req.params.postId,
            content: req.body.content,
        });    
        await comment.save();
        res.status(200).json(comment);
    } 
    catch (error) {
        console.log(error);
    }
}

exports.getComments = async (req, res) => {
    try {
        const comments = await CommentModel.find({post_id: req.params.postId});
        res.status(200).json(comments);
    } 
    catch (error) {
        console.log(error);
    }
};

exports.updateComment = async (req, res) => {
    try {
        const comment = await CommentModel.findByIdAndUpdate(req.params.id, {
            content: req.body.content,
        }, {new: true});
        res.status(200).json(comment);
    } 
    catch (error) {
        console.log(error);
    }
};

exports.deleteComment = async (req, res) => {
    try {
        await CommentModel.findByIdAndDelete(req.params.id);
        res.status(200).json("deleted successfully");
    } 
    catch (error) {
        console.log(error);
    }
};
const NotificationModel = require('../models/Notification');

exports.addNotification = async (req, res) => {
    try {
        const notification = new NotificationModel({
            sender_id: req.params.senderId,
            receiver_id: req.params.receiverId,
            type: req.body.type,
            post_id: req.body.postId,
            user_id: req.body.userId,
            document_id: req.body.documentId,
        });    
        notification.save();
        res.status(200).json(notification);
    } 
    catch (error) {
        console.log(error);
    }
}

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await NotificationModel.find({ receiver_id: req.params.receiverId });
        res.status(200).json(notifications);
    } 
    catch (error) {
        console.log(error);
    }
}
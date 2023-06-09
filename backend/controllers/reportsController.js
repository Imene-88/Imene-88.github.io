const ReportsModel = require('../models/Report');

exports.addReport = async (req, res) => {
    try {
        const report = new ReportsModel({
            sender_id: req.params.senderId,
            receiver_id: req.body.receiverId,
            checked_answer: req.body.checkedAnswer,
            content: req.body.content,
            post_id: req.body.postId,
            reported_user_id: req.body.reportedUserId,
        });   
        await report.save();
        res.status(200).json(report); 
    } 
    catch (error) {
        console.log(error);
    }
};

exports.getReports = async (req, res) => {
    try {
        const reports = await ReportsModel.find({ receiver_id: req.params.adminId });
        res.status(200).json(reports); 
    } 
    catch (error) {
        console.log(error);
    }
}
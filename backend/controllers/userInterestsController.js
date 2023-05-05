const UserInterestsModel = require('../models/UserInterests');

exports.addUserInterests = async (req, res) => {
    try {
        const userInterest = await UserInterestsModel.findOneAndUpdate({ user_id: req.params.userId }, { interests: req.body.interests }, { upsert: true });
        res.status(200).json(userInterest);
    } 
    catch (error) {
        console.log(error);
    }
};

exports.getUserInterests = async (req, res) => {
    try {
        const userInterest = await UserInterestsModel.find({ user_id: req.params.userId });
        res.status(200).json(userInterest);
    } 
    catch (error) {
        console.log(error);
    }
};
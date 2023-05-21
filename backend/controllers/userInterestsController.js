const UserInterestsModel = require('../models/UserInterests');
const UserModel = require('../models/User');

exports.addUserInterests = async (req, res) => {
    try {
        const userInterest = new UserInterestsModel({
            user_id: req.params.userId,
            occupation: req.body.occupation,
            interests: req.body.interests,
            birth_date: new Date(req.body.birth_date),
        });
        await userInterest.save();
        res.status(200).json(userInterest);
    } 
    catch (error) {
        console.log(error);
    }
};

exports.getUsersInterests = async (req, res) => {
    try {
        let similarProfiles = [];
        const currentUserInterests = await UserInterestsModel.findOne({ user_id: req.params.userId });
        const usersInterests = await UserInterestsModel.find({ user_id: {$ne: req.params.userId} });
        usersInterests.map((userInterests) => {
            const isFound =  currentUserInterests.interests.some((interest) => userInterests.interests.includes(interest));
            if (isFound) {
                similarProfiles.push(userInterests.user_id);
            }
        });
        const similarProfilesUsers = await Promise.all(
            similarProfiles.map((similarProfile) => {
                return UserModel.findById(similarProfile);
            })
        );  
        res.status(200).json(similarProfilesUsers);
    } 
    catch (error) {
        console.log(error);
    }
};

exports.getBirthDate = async (req, res) => {
    try {
        const user = await UserInterestsModel.findOne({ user_id: req.params.userId });
        res.status(200).json(user.birth_date);  
    } 
    catch (error) {
        console.log(error);
    }
};

exports.updateBirthDate = async (req, res) => {
    try {
        const user = await UserInterestsModel.findOneAndUpdate({ user_id: req.params.userId }, { birth_date: new Date(req.body.birth_date) }, { new: true });
        res.status(200).json(user);  
    } 
    catch (error) {
        console.log(error);
    }
};
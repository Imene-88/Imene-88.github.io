const AccessRightsModel = require("../models/AccessRights");

exports.addUser = async (req, res) => {
    const user = await AccessRightsModel.findOne({ user_id: req.params.userId });
    if (user) {
        return;
    } else {
        try {
           const user = new AccessRightsModel({
                user_id: req.params.userId,
           });
           await user.save();
           res.status(200).json(user);
        } 
        catch (error) {
            console.log(error);
        }
    }
};

exports.addAccessRight = async (req, res) => {
    const userId = req.params.userId;
    const documentId = req.params.documentId;
    const accessright = req.body.accessright;
    try {
        const user = await AccessRightsModel.findOne({ user_id: userId });
        await user.updateOne({ $push: { access_rights: { document_id: documentId, access_right: accessright }}});
        res.status(200).json("updated successfully");
    }
    catch (error) {
        console.log(error);
    }
};

exports.getAccessRight = async (req, res) => {
    try {
        const documentId = req.params.documentId;
        const user = await AccessRightsModel.findOne({ user_id: req.params.userId });
        const filteredAccessRight = user.access_rights.filter((item) => item.document_id === req.params.documentId);
        res.status(200).json(filteredAccessRight[0]? filteredAccessRight[0].access_right : "");    
    } 
    catch (error) {
        console.log(error);
    }
}

exports.updateAccessRight = async (req, res) => {
    const userId = req.params.userId;
    const documentId = req.params.documentId;
    const accessright = req.body.accessright;
    try {  
        const response = await AccessRightsModel.findOneAndUpdate(
            { user_id: userId, 'access_rights.document_id': documentId },
            { $set: { 'access_rights.$.access_right': accessright } },
            { new: true }
        );
        res.status(200).json(response);
    } 
    catch (error) {
        console.log(error);
    }
};
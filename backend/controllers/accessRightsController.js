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
    const documentId = req.params.documentId;
    const accessright = req.body.accessright;
    try {
        const user = await AccessRightsModel.findOneAndUpdate(
            { user_id: req.params.userId },
            { $push: { access_rights: { document_id: documentId, access_right: accessright } } },
            { new: true }
        );
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
    }
};

/*exports.updateAccessRight = async (req, res) => {
    const userId = req.params.userId;
    const documentId = req.params.documentId;
    const accessright = req.body.accessright;
    try {  
        const accessRight = await AccessRightsModel.findOne({ user_id: userId });
        const response = await Promise.all(
            accessRight.access_rights.map((item) => {
                if (item.document_id === documentId) {
                    item.access_right = accessright;
                }
            })
        );
        //const response = await accessRight.updateOne({$push: {access_rights: { doucment_id: documentId, access_right: accessright }}}, {new: true});
        res.status(200).json(response);
    } 
    catch (error) {
        console.log(error);
    }
};*/
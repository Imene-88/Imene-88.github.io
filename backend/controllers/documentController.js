const DocumentModel = require("../models/Document");
const LikeModel = require("../models/Like");
const UserModel = require("../models/User");

exports.getDocument = async (req, res) => {
    try {
        const document = await DocumentModel.findById(req.params.documentId);
        if (document) {
            return document;
        }
    }
    catch(error) {
        console.log(error);
    }
};

exports.getDocumentParticipants = async (req, res) => {
    let participantsInformations = [];
    try {
        const document = await DocumentModel.findById(req.params.documentId);
        const participants = document.participants;
        for (i = 0; i < participants.length; i++) {
            let user = await UserModel.findById(participants[i]);
            const {type_of_color_blindness,password,account_type,followers,following,email, ...other} = user._doc;
            participantsInformations[i] = other;
        }
        res.status(200).json(participantsInformations);
    }
    catch(error) {
        console.log(error);
    }
};

exports.getDocuments = async (req, res) => {
    try {
        const userDocumentsList = await DocumentModel.find({owner_id: req.params.userId});
        const participantDocumentsList = await DocumentModel.find({participants: req.params.userId});
        const userDocumentsListFiltered = userDocumentsList.filter((userDocument) => !participantDocumentsList.some((participantDocument) => participantDocument._id === userDocument._id));
        const totalDocuments = [...userDocumentsListFiltered, ...participantDocumentsList];
        res.status(200).json(totalDocuments);
    }
    catch(error) {
        console.log(error);
    }
}

exports.getPostDocument = async (document_id, userId) => {
    try {
        const document = await DocumentModel.findById(document_id);
        if (document) {
            return document;
        } else {
            await DocumentModel.create({
                _id: document_id,
                owner_id: userId,
                content: "",
            });
        }
    }
    catch(error) {
        console.log(error);
    }
}

exports.updateDocument = async (req, res) => {
    try {
        const receiverId = req.query.receiverId;
        const document = await DocumentModel.findById(req.params.documentId);
        receiverId ? (!document.participants.includes(receiverId) && await document.updateOne({$push: {participants: receiverId}})) : await document.updateOne({$set: {open: true, description: req.body.description}, $push: {participants: document.owner_id}});
        res.status(200).json(document);
    }
    catch(error) {
        console.log(error);
    }
}

exports.getOpenDocuments = async (req, res) => {
    try {
        const openDocuments = await DocumentModel.find({open: true}); 
        res.status(200).json(openDocuments);   
    } 
    catch (error) {
        console.log(error);
    }
}

exports.getOpenDocumentLikesCount = async (req, res) => {
    try {
        const document = await DocumentModel.findById(req.params.id);
        const likesCount = await LikeModel.countDocuments({open_document_id: document._id});
        res.json(likesCount);
    }
    catch(error) {
        console.log(error);
    }
};

exports.deleteDocument = async (req, res) => {
    try {
        await DocumentModel.findByIdAndDelete(req.params.id);
        res.status(200).json("deleted");
        //const documents = await DocumentModel.find({ owner_id: req.body.userId });
        //res.status(200).json(documents);   
    } 
    catch (error) {
        console.log(error);
    }
}
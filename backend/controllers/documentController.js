const DocumentModel = require("../models/Document");
const LikeModel = require("../models/Like");

exports.getDocument = async (documentId) => {
    try {
        const document = await DocumentModel.findById(documentId);
        if (document) {
            return document;
        }
    }
    catch(error) {
        console.log(error);
    }
};

exports.getDocuments = async (req, res) => {
    try {
        const userDocumentsList = await DocumentModel.find({owner_id: req.params.userId});
        const participantDocumentsList = await DocumentModel.find({participants: req.params.userId});
        const totalDocuments = [...userDocumentsList, ...participantDocumentsList];
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
        receiverId ? await document.updateOne({$push: {participants: req.params.receiverId}}) : await document.updateOne({$set: {open: true, description: req.body.description}});
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
const DocumentModel = require("../models/Document");

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
        const documentsList = await DocumentModel.find({owner_id: req.params.userId});
        res.status(200).json(documentsList);
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
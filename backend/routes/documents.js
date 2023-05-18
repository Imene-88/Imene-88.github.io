const router = require("express").Router();
const documentController = require("../controllers/documentController");

router.get("/open", documentController.getOpenDocuments);

router.put("/:documentId/update", documentController.updateDocument);

router.put("/updateTitle/:documentId", documentController.updateDocumentTitle);

router.get("/:id/likesCount", documentController.getOpenDocumentLikesCount);

router.get("/:userId/documents", documentController.getDocuments);

router.get("/participants/:documentId", documentController.getDocumentParticipants);

router.get("/getTitle/:documentId", documentController.getTitle);

router.delete("/:id", documentController.deleteDocument);

router.post("/shareDocument/:documentId/:receiverId", documentController.shareDocumentWithUsers);

module.exports = router;
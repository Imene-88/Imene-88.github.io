const router = require("express").Router();
const documentController = require("../controllers/documentController");

router.get("/open", documentController.getOpenDocuments);

router.put("/:documentId/update", documentController.updateDocument);

router.get("/:id/likesCount", documentController.getOpenDocumentLikesCount);

router.get("/:userId/documents", documentController.getDocuments);


module.exports = router;
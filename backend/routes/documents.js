const router = require("express").Router();
const documentController = require("../controllers/documentController");

router.get("/:userId/documents", documentController.getDocuments);

module.exports = router;
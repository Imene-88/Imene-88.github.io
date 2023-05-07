const router = require("express").Router();
const accessRightsController = require("../controllers/accessRightsController");

router.post("/:userId/addUser", accessRightsController.addUser);

router.put("/:userId/addAccessRight/:documentId", accessRightsController.addAccessRight);

module.exports = router;
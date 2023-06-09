const router = require("express").Router();
const accessRightsController = require("../controllers/accessRightsController");

router.post("/:userId/addUser", accessRightsController.addUser);

router.get("/:userId/getAccessRight/:documentId", accessRightsController.getAccessRight);

router.put("/:userId/addAccessRight/:documentId", accessRightsController.addAccessRight);

router.put("/updateAccessRight/:userId/:documentId", accessRightsController.updateAccessRight);

module.exports = router;
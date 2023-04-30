const router = require("express").Router();
const adminController = require("../controllers/adminController");

router.get("/totalDocumentsInCollections", adminController.calcTotalDocumentsInCollections);

router.get("/recentUsers", adminController.getRecentUsers);

router.get("/allUsers", adminController.getAllUsers);

module.exports = router;
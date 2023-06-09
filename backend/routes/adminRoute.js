const router = require("express").Router();
const adminController = require("../controllers/adminController");

router.get("/totalDocumentsInCollections", adminController.calcTotalDocumentsInCollections);

router.get("/recentUsers", adminController.getRecentUsers);

router.get("/allUsers", adminController.getAllUsers);

router.get("/allAdmins", adminController.getAllAdmins);

router.get("/allPosts", adminController.getAllPosts);

router.get("/likeUsers/:postId", adminController.getLikeUsers);

module.exports = router;
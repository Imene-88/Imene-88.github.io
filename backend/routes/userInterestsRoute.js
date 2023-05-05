const router = require("express").Router();
const userInterestsController = require("../controllers/userInterestsController");

router.post("/addUserInterests/:userId", userInterestsController.addUserInterests);

router.get("/getUserInterests/:userId", userInterestsController.getUserInterests);

module.exports = router;
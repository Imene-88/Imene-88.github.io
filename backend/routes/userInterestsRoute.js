const router = require("express").Router();
const userInterestsController = require("../controllers/userInterestsController");

router.post("/addUserInterests/:userId", userInterestsController.addUserInterests);

router.get("/getSimilarProfiles/:userId", userInterestsController.getUsersInterests);

module.exports = router;
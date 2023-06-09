const router = require("express").Router();
const userInterestsController = require("../controllers/userInterestsController");

router.post("/addUserInterests/:userId", userInterestsController.addUserInterests);

router.get("/getSimilarProfiles/:userId", userInterestsController.getUsersInterests);

router.get("/getBirthDate/:userId", userInterestsController.getBirthDate);

router.put("/updateBirthDate/:userId", userInterestsController.updateBirthDate);

module.exports = router;
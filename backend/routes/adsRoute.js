const router = require("express").Router();
const adsController = require("../controllers/adsController");

router.post("/createAd/:adminId", adsController.addAd);

router.get("/getAds", adsController.getAds);

router.get("/getAdsCount", adsController.getAdsCount);

router.delete("/deleteAd/:id", adsController.deleteAd);

module.exports = router;
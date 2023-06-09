const router = require("express").Router();
const reportsController = require("../controllers/reportsController");

router.post("/addReport/:senderId", reportsController.addReport);

router.get("/getReports/:adminId", reportsController.getReports);

module.exports = router;
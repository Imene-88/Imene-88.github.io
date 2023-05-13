const router = require('express').Router();
const notificationsController = require("../controllers/NotificationsController");

router.post("/addNotification/:senderId/:receiverId", notificationsController.addNotification);

router.get("/getNotifications/:receiverId", notificationsController.getNotifications);

module.exports = router;
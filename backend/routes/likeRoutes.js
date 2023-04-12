const router = require("express").Router();
const likeController = require("../controllers/likeController");

router.post("/like_post/:id", likeController.likePost);

router.delete("/unlike_post/:id", likeController.unlikePost);

module.exports = router;
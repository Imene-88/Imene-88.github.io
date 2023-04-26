const router = require("express").Router();
const likeController = require("../controllers/likeController");

//router.post("/like_post/:id", likeController.likePost);

router.post("/like_open_document/:id", likeController.likeOpenDocument);

router.delete("/unlike_post/:id", likeController.unlikePost);

router.delete("/unlike_open_document/:id", likeController.unlikeOpenDocument);

module.exports = router;
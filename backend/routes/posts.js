const router = require("express").Router();
const postController = require("../controllers/postController");

router.post("/create_post", postController.createPost);

router.get("/:id/likesCount", postController.getLikesCount);

router.get("/commentsCount/:id", postController.getCommentsCount);

router.get("/feed/:userId", postController.getFeed);

router.put("/:id", postController.updatePost);

router.delete("/:id", postController.deletePost);

// Like and unlike a post

router.get("/:id", postController.getPost);

router.get("/myPosts/:id", postController.getMyPosts);

module.exports = router;
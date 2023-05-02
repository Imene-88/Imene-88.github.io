const router = require("express").Router();
const postController = require("../controllers/postController");

router.post("/create_post", postController.createPost);

router.post("/:userId/save_post/:postId", postController.savePost);

router.get("/:id/likesCount", postController.getLikesCount);

router.get("/commentsCount/:id", postController.getCommentsCount);

router.get("/feed/:userId", postController.getFeed);

router.get("/savedPosts/:userId", postController.getSavedPosts);

router.get("/:userId/savedPost/:postId", postController.getSavedPost);

router.put("/:id", postController.updatePost);

router.delete("/unsave_post/:userId/:postId", postController.unsavePost);

router.delete("/:id", postController.deletePost);

// Like and unlike a post

router.get("/:id", postController.getPost);

router.get("/myPosts/:id", postController.getMyPosts);

module.exports = router;
const router = require("express").Router();
const commentController = require("../controllers/commentController");

router.post("/:userId/:postId", commentController.createComment);

router.get("/:postId", commentController.getComments);

router.put("/:id", commentController.updateComment);

router.delete("/:id", commentController.deleteComment);

module.exports = router;
const router = require("express").Router();
const userController = require("../controllers/userController");
const connectedUsersController = require("../controllers/connectedUsersController");

router.put("/:id", userController.updateUser);

router.get("/userProfile/:fullname", userController.getUserPosts);

router.get("/:id/followings", userController.getUserFollowings);

router.get("/:id/postsCount", userController.getUserPostsCount);

router.get("/:userId/getFollowing/:userFollowingId", userController.getUserFollowing);

router.get("/search", userController.searchUser);

router.delete("/:id", userController.deleteUser);

router.get("/user", userController.getUser);

router.get("/", userController.gelAllUsers);

router.put("/:id/follow", userController.followUser);

router.put("/:id/unfollow", userController.unfollowUser);

module.exports = router;
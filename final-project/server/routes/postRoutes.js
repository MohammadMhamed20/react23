const {
  createNewPostController,
  getAllPostsController,
  createCommentController,
  likeUnlikeController,
  deletePostController,
  updatePostController,
  getAllPostsByUserIdController,
} = require("../controllers/postController");
const checkAuth = require("../middlewares/authMiddleware");
const router = require("express").Router();

// get all posts
router.get("/", checkAuth, getAllPostsController);

// get all posts by user id
router.get("/get-all", checkAuth, getAllPostsByUserIdController);

// create new post
router.post("/", checkAuth, createNewPostController);

// create new comment
router.post("/:id/create-comment", checkAuth, createCommentController);

// update post
router.put("/:id", checkAuth, updatePostController);

// like and unlike
router.post("/:id/like-unlike", checkAuth, likeUnlikeController);

// delete post
router.delete("/:id", checkAuth, deletePostController);

module.exports = router;

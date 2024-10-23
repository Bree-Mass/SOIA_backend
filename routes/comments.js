const router = require("express").Router();
const {
  createComment,
  editComment,
  deleteComment,
  getUserComments,
  getCommentsByPage,
} = require("../controllers/comments");
const auth = require("../middlewares/auth");
const { validateComment } = require("../middlewares/validation");

router.post("/comments", auth, validateComment, createComment);
router.patch("/comments/:commentId", auth, editComment);
router.delete("/comments/:commentId", auth, deleteComment);
router.get("/comments/user/me", auth, getUserComments);
router.get("/comments/page/:page", getCommentsByPage);

module.exports = router;

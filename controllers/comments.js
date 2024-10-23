const Comment = require("../models/comment");
const User = require("../models/user");

module.exports.createComment = (req, res, next) => {
  const { name, comment, page } = req.body;
  const userId = req.user._id;
  console.log("Received request to create Comment");

  const newComment = new Comment({
    name,
    comment,
    page,
    user: userId,
  });

  newComment
    .save()
    .then((savedComment) => res.status(201).json(savedComment))
    .catch((err) => next(err));
};

module.exports.editComment = (req, res, next) => {
  const { commentId } = req.params;
  const userId = req.user._id;
  const { name, comment, page } = req.body;
  console.log("Received request to edit Comment");

  Comment.findOneAndUpdate(
    { _id: commentId, user: userId },
    { name, comment, page },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((updatedComment) => {
      if (!updatedComment) {
        return res
          .status(404)
          .json({ message: "Comment not found or unauthorized" });
      }
      res.json(updatedComment);
    })
    .catch((err) => next(err));
};

module.exports.deleteComment = (req, res, next) => {
  console.log(
    `Received request to delete comment with ID ${req.params.commentId}`
  );

  return Comment.findByIdAndDelete(req.params.commentId)
    .orFail()
    .then(() =>
      res.status(200).json({ message: "Comment successfully deleted" })
    )
    .catch((err) => next(err));
};

module.exports.getUserComments = (req, res, next) => {
  console.log("Received request to get user comments");
  return Comment.findCommentsByUserId(req.user._id)
    .then((comments) => {
      if (!comments || comments.length === 0) {
        return res.status(200).json({ data: [] });
      }
      res.json({ data: comments });
    })
    .catch((err) => next(err));
};

module.exports.getCommentsByPage = (req, res, next) => {
  console.log(`Received request to get comments for page ${req.params.page}`);
  return Comment.findCommentsByPage(req.params.page)
    .then((comments) => {
      if (!comments || comments.length === 0) {
        return res.status(200).json({ data: [] });
      }
      res.json({ data: comments });
    })
    .catch((err) => next(err));
};

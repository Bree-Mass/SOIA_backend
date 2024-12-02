const Comment = require("../models/comment");

module.exports.createComment = (req, res, next) => {
  const { name, comment, page } = req.body;
  const userId = req.user._id;

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

  Comment.findOneAndUpdate(
    { _id: commentId, user: userId },
    { name, comment, page },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((updatedComment) =>
      updatedComment
        ? res.json(updatedComment)
        : res.status(404).json({ message: "Comment not found or unauthorized" })
    )
    .catch((err) => next(err));
};

module.exports.deleteComment = (req, res, next) =>
  Comment.findByIdAndDelete(req.params.commentId)
    .orFail()
    .then(() =>
      res.status(200).json({ message: "Comment successfully deleted" })
    )
    .catch((err) => next(err));

module.exports.getUserComments = (req, res, next) =>
  Comment.findCommentsByUserId(req.user._id)
    .then((comments) =>
      comments && comments.length > 0
        ? res.json({ data: comments })
        : res.status(200).json({ data: [] })
    )
    .catch((err) => next(err));

module.exports.getCommentsByPage = (req, res, next) =>
  Comment.findCommentsByPage(req.params.page)
    .then((comments) =>
      comments && comments.length > 0
        ? res.json({ data: comments })
        : res.status(200).json({ data: [] })
    )
    .catch((err) => next(err));

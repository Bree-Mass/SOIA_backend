const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  comment: {
    type: String,
    minlength: 2,
    maxlength: 500,
    required: true,
  },
  page: {
    type: Number,
    default: 0,
    validate: {
      validator: Number.isInteger,
      message: "Page must be a number",
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

commentSchema.statics.findCommentsByUserId = function (userId) {
  return this.find({ user: userId });
};

commentSchema.statics.findCommentsByPage = function (page) {
  return this.find({ page });
};

module.exports = mongoose.model("comment", commentSchema);

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 16,
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: "You must enter a valid Email address",
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  page: {
    type: Number,
    default: 0,
    validate: {
      validator: Number.isInteger,
      message: "Page must be a number",
    },
  },
});

userSchema.virtual("comments", {
  ref: "comment",
  localField: "_id",
  foreignField: "user",
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);

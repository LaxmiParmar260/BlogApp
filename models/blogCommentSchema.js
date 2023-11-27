const mongoose = require("mongoose");

const blogCommentSchema = mongoose.Schema({
  post: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  blogID: {
    type: mongoose.Types.ObjectId,
    ref: "blog",
    required: true,
  },
  isActive: {
    type: String,
    default: true,
  },
});
blogCommentSchema.set("timestamps", true);

module.exports = mongoose.model("blogComment", blogCommentSchema);

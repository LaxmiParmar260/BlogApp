const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: {
    type : Number,
    default: 0
  },
  blogImage: {
    type: String,
    required: true,
  },
  isActive: {
    type: String,
    default: true,
  },
});
blogSchema.set("timestamps", true);

module.exports = mongoose.model("blog", blogSchema);

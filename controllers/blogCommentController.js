const blogCommentSchema = require("../models/blogCommentSchema");

module.exports = {
  addComment: async (req, res) => {
    const commentData = new blogCommentSchema(req.body);
    try {
      await commentData.save();
      res.status(201).json({
        success: true,
        message: "Comment added successfully",
        comment: commentData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error occur ${error.message}`,
      });
    }
  },
};

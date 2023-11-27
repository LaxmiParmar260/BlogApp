const express = require("express");
const commentRouter = express.Router();

const blogCommentController = require("../controllers/blogCommentController");

commentRouter.post("/add", blogCommentController.addComment);

module.exports = commentRouter;

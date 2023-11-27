const express = require("express");

const userRouter = require("../routes/userRoutes");
const blogRouter = require("../routes/blogRoutes");
const commentRouter = require("../routes/blogCommentRoutes");

const commonRouter = express.Router();

commonRouter.use("/user", userRouter);
commonRouter.use("/blog", blogRouter)
commonRouter.use("/comment",commentRouter )

module.exports = commonRouter;

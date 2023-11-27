let express = require("express");

const blogRouter = express.Router();

let blogController = require("../controllers/blogController");
const { blogUpload } = require("../middlewares/blogImageStorage");
const { authorizeAdmin} = require("../middlewares/authorization");
const { userAuthentication } = require("../middlewares/authentication");
const {createBlogValidation,} = require("../validations/blog/blogDataValidation");

blogRouter.post(
  "/create",
  blogUpload.single("blogImage"),
  userAuthentication,
  authorizeAdmin,
  createBlogValidation,
  blogController.createBlog
);

blogRouter.get("/list",blogController.blogList) 
blogRouter.post("/title", blogController.searchBlog)
blogRouter.put("/update/:id",blogController.updateBlog)
blogRouter.get("/details/:id",blogController.blogDetail)
blogRouter.delete("/delete/:id",blogController.deleteBlog)
blogRouter.post("/like/:id",userAuthentication, blogController.blogLike)

module.exports = blogRouter; 

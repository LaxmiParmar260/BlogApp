const { unlinkSync } = require("fs");
const blogSchema = require("../models/blogSchema");
const blogCommentSchema = require("../models/blogCommentSchema");

module.exports = {
  createBlog: async (req, res) => {
    try {
      const newBlog = new blogSchema(req.body);
      newBlog.title = req.body.title
        .trim()
        .split(" ")
        .map((data) => {
          return data.charAt(0).toUpperCase() + data.slice(1);
        })
        .join(" ");
      const checkBlog = await blogSchema.findOne({
        title: newBlog.title,
      });
      if (checkBlog) {
        req.file ? unlinkSync(req.file.path) : null;
        res.status(409).json({
          success: false,
          message: `This blog is already exists`,
        });
      } else {
        const filePath = `/uploads/blog/${req.file.filename}`;
        newBlog.blogImage = filePath;
        const blog = await newBlog.save();
        res.status(201).json({
          success: true,
          message: "Blog created",
          addedBlog: blog,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error occur : ${error.message}`,
      });
    }
  },

  blogDetail: async (req, res) => {
    blogID = req.params.id;
    userID = req.params.user;
    try {
      const blogData = await blogSchema.findById(req.params.id);
      const commentDataList = await blogCommentSchema
        .find({ blogID: req.params.id })
        .populate({ path: "userID", select: "userName profilePic" });
      res.status(200).json({
        success: true,
        message: "Comment list fetched successfully",
        blog: blogData,
        commentList: commentDataList,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Comment not found ${error.message}`,
      });
    }
  },

  blogList: async (req, res) => {
    try {
      const showAllBlogs = await blogSchema.find();
      const totalBlogs = await blogSchema.find().count();
      res.status(200).json({
        success: true,
        message: "All blogs",
        count: totalBlogs,
        blogList: showAllBlogs,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error occur : ${error.message}`,
      });
    }
  },

  searchBlog: async (req, res) => {
    const { title } = req.body;
    try {
      const foundBlogs = await blogSchema.find({
        title: { $regex: title, $options: "i" },
      });
      if (foundBlogs.length > 0) {
        res.status(200).json({
          success: true,
          message: "Searched blogs by title",
          blogs: foundBlogs,
        });
      } else {
        res.status(403).json({
          success: false,
          message: `No blog found`,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error occure ${error.message}`,
      });
    }
  },

  updateBlog: async (req, res) => {
    //passing blog id
    const { id } = req.params;
    const updateFields = req.body;
    try {
      const updatedBlog = await blogSchema.findByIdAndUpdate(id, updateFields, {
        new: true,
      });
      if (!updatedBlog) {
        res.status(404).json({
          success: false,
          message: "Blog not found",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Blog updated successfully",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error occure ${error.message}`,
      });
    }
  },

  deleteBlog: async (req, res) => {
    const { id } = req.params;
    const deleteField = req.body;
    try {
      const deletedBlog = await blogSchema.findByIdAndDelete(
        id,
        deleteField,
        {}
      );
      if (!deletedBlog) {
        res.status(404).json({
          success: false,
          message: "Blog not found",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Blog deleted successfully",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error occure ${error.message}`,
      });
    }
  },

  blogLike: async (req, res) => {
    const { likes } = req.body;
    try {
      const blog = await blogSchema.findById(req.params.id);
      if (likes == 1) {
        await blogSchema.findByIdAndUpdate(
          req.params.id,
          { like: ++blog.like },
          { new: true }
        );
        res.status(202).json({
          success: true,
          message: "You have liked this blog",
          like: blog.like,
        });
      } else {
        await blogSchema.findByIdAndUpdate(
          req.params.id,
          { like: --blog.like },
          { new: true }
        );
        res.status(202).json({
          success: true,
          message: "You have disliked this blog",
          like: blog.like,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error occure ${error.message}`,
      });
    }
  },
};

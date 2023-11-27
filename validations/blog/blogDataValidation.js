const blogCreateValSchema = require("./blogCreateValSchema");

module.exports = {
  createBlogValidation: async (req, res, next) => {
    let isValid = await blogCreateValSchema.createBlog.validate(req.body, {
      isEarly: false,
    });
    if (isValid.error) {
      res.status(403).json({
        success: false,
        message: isValid.error.details[0].message,
      });
    } else {
      next();
    }
  },
};

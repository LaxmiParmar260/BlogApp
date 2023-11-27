const joi = require("joi");

const blogCreateValSchema = {
  createBlog: joi
    .object({
      title: joi
        .string()
        .min(2)
        .max(20)
        .message({
          "string.min": "{#lable} should contain at least {#limit} character",
        })
        .required(),
      content: joi.string().required(),
    })
    .unknown(true),
};

module.exports = blogCreateValSchema;

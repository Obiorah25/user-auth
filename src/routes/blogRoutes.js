const express = require("express");
const requireSignin = require("../middlewares/requireSignin");
const {
  createBlog,
  getBlogs,
  getSingleBlogs,
} = require("../contollers/blogController");
const blogRouter = express.Router();

blogRouter.post("/", requireSignin, createBlog);
blogRouter.get("/", getBlogs);
blogRouter.get("/:blogId", getSingleBlogs);

module.exports = blogRouter;

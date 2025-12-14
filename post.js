const express = require("express");
const Post = require("../models/Post");
const auth = require("/middleware/authMiddleware");

const router = express.Router();

router.post("/posts", auth, async (req, res) => {
  const post = await Post.create(req.body);
  res.json(post);
});

router.get("/feed", auth, async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

router.post("/like/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.likes.push(req.user.id);
  await post.save();
  res.send("Liked");
});

router.post("/comment/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.comments.push(req.body);
  await post.save();
  res.send("Comment added");
});

router.get("/posts/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

module.exports = router;

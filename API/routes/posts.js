const router = require("express").Router();
const Post = require("../models/Posts");
const User = require("../models/User");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("updated successfuly");
    } else {
      res.status(403).json("cannot edit post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// TOGGLE FULFILL STATUS
router.put("/:id/editpost", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(req.body.isAdmin);
    if (post.userId === req.body.userId || req.body.isAdmin === true) {
      await post.updateOne({
        $set: { isfullfilled: !post.isfullfilled },
      });
      res.status(200).json("Updated successfuly");
    } else {
      res.status(403).json("cannot update post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE A POST

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //console.log(req.body.userId);

    if (post.userId === req.body.userId || req.body.isAdmin) {
      await post.deleteOne();
      res.status(200).json("Deleted successfuly");
    } else {
      res.status(403).json("cannot delete post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET A POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POSTS BY SPECIFIC USER
router.get("/myposts/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(500).json(error);
  }
});

//FETCH USERS INTERESTED IN A JOB
router.get("/:id/userinterested", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //const user = await User.findById(post.userId);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Add to Interested

router.put("/:id/interested", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.interestedEmployees.includes(req.body.userId)) {
      await post.updateOne({ $push: { interestedEmployees: req.body.userId } });
      res.status(200).json("The post has been added to interest");
    } else {
      await post.updateOne({ $pull: { interestedEmployees: req.body.userId } });
      res.status(200).json("The post has been removed to interest");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

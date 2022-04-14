const router = require("express").Router();
const User = require("../models/User");
//const Post = require("../models/Post");

//get user info of a single user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const {
      password,
      usertype,
      date,
      isAdmin,
      jobsfollowing,
      profilepicture,
      ...other
    } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL USERS FOR ADMIN
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// MAKE USER AN ADMIN
router.put("/:id/edituser", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const admin = await User.findById(req.body.userId);
    if (admin.isAdmin) {
      await user.updateOne({
        $set: { isAdmin: !user.isAdmin },
      });
      res.status(200).json("Updated successfuly");
    } else {
      res.status(403).json("cannot update post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE A USER
router.delete("/:id", async (req, res) => {
  try {
    const admin = await User.findById(req.body.userId);
    console.log(req.body.userId);
    console.log(admin.isAdmin);
    if (admin.isAdmin) {
      const user = await User.findById(req.params.id);
      await user.deleteOne();
      res.status(200).json("deleted Successfuly");
    } else {
      res.status(403).json("You are not authorized");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//get user with all data
router.get("/:id/currentuser", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update user
router.put("/:id", async (req, res) => {
  console.log(req.body);
  if (req.body.userId === req.params.id) {
    // if (req.body.password) {
    //   try {
    //     const salt = await bcrypt.genSalt(10);
    //     req.body.password = await bcrypt.hash(req.body.password, salt);
    //   } catch (err) {
    //     return res.status(500).json(err);
    //   }
    // }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

module.exports = router;

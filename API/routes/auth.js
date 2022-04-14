const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//REGISTER
router.post("/register", async (req, res) => {
  //check if user already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send("Email already exists");
  }

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.password, salt);

  //create new user using the user schema
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    usertype: req.body.usertype,
    email: req.body.email,
    password: hashedpassword,
  });

  try {
    const savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    //check if the email exists in the database
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ msg: "Wrong email or password" });
    }

    //password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).json({ msg: "Invalid password" });

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }

  //         //Create and assign a token
  //         const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  //         res.header('auth-token', token).send({token, user})

  //         // res.send('success')
});

module.exports = router;

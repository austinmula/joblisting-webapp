const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  usertype: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  profilebio: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  telnum: {
    type: String,
    default: "",
  },
  profilepicture: {
    type: String,
    default: "",
  },
  jobsfollowing: {
    type: Array,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const studentSChema = mongoose.Schema({
  fname: {
    type: "string",
    required: true,
  },
  lname: {
    type: "string",
    required: true,
  },
  userName: {
    type: "string",
    required: true,
    unique: true,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
  },
  password: {
    type: "string",
    required: true,
  },
  role: {
    type: "string",
    default: "student"
  },
});

module.exports = mongoose.model("Student", studentSChema);

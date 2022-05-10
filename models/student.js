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
  },
  email: {
    type: "string",
    required: true,
  },

  password: {
    type: "string",
    required: true,
  },
});

module.exports = mongoose.model("Student", studentSChema);

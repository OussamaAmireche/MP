const mongoose = require("mongoose");
const teacherSChema = mongoose.Schema({
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
  moduleId: {
    type: "string",
    required: true,
    ref: "Module",
  },
  responsible: {
    type: "boolean",
    required: true,
  },
});

module.exports = mongoose.model("Teacher", teacherSChema);

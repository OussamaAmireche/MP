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
  moduleId: {
    type: "string",
    required: true,
    ref: "Matiere",
  },
  responsible: {
    type: "boolean",
    required: true,
  },
  role: {
    type: "string",
    default: "teacher"
  },
});

module.exports = mongoose.model("Teacher", teacherSChema);

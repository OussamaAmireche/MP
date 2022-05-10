const mongoose = require("mongoose");
const ScoreSChema = mongoose.Schema({
  studentId: {
    type: "String",
    required: true,
    ref: "Student",
  },
  moduleId: {
    type: "String",
    required: true,
    ref: "module",
  },
  score: {
    type: "Number",
    required: true,
  },
});

module.exports = mongoose.model("Score", ScoreSChema);

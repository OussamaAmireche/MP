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
    ref: "Matiere",
  },
  score: {
    type: "Number",
    required: true,
  },
});

module.exports = mongoose.model("Score", ScoreSChema);

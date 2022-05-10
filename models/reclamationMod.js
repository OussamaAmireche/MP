const mongoose = require("mongoose");
const ReclamationModSChema = mongoose.Schema({
  studentId: {
    type: "String",
    required: true,
    ref: "Student",
  },
  moduleId: {
    type: "String",
    required: true,
    ref: "Module",
  },
  Description: {
    type: "String",
    required: true,
  },
});

module.exports = mongoose.model("ReclamationMod", ReclamationModSChema);

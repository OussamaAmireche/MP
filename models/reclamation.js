const mongoose = require("mongoose");
const ReclamationSChema = mongoose.Schema({
  studentId: {
    type: "String",
    required: true,
    ref: "Student",
  },

  Description: {
    type: "String",
    required: true,
  },
});

module.exports = mongoose.model("Reclamation", ReclamationSChema);

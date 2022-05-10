const mongoose = require("mongoose");
const MatiereSChema = mongoose.Schema({
  codeM: {
    type: "String",
    required: true,
  },
  matiereName: {
    type: "String",
    required: true,
  },
});

module.exports = mongoose.model("Matiere", MatiereSChema);

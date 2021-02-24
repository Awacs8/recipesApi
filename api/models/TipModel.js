const mongoose = require("mongoose");

const TipSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
});

const Tip = mongoose.model("Tip", TipSchema);
module.exports = Tip;

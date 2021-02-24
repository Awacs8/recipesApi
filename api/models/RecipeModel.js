const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true,
  },
  difficulty: {
    type: String,
    enum: ["lako", "srednje", "tesko"],
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  preparation_time: {
    type: Number,
    trim: true,
  },
  ingredients: [
    {
      ingName: { type: String, trim: true, required: true },
      quantity: { type: Number, trim: true },
      unit_of_measure: { type: String, trim: true, required: true },
    },
  ],
  preparation_steps: {
    type: Array,
    trim: true,
    required: true,
  },
});

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;

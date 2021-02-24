const express = require("express");
const recipeModel = require("../models/RecipeModel");

const app = express();

//get all recipes
app.get("/api/recipes", async (request, response) => {
  try {
    const recipes = await recipeModel.find({});

    response.status(200).send(recipes);
  } catch (err) {
    response.status(500).send(err);
  }
});

//get recipe by id
app.get("/api/recipes/:id", async (request, response) => {
  try {
    const recipe = await recipeModel.findById({ _id: request.params.id });
    response.status(200).send(recipe);
  } catch (err) {
    response.status(500).send(err);
  }
});

//create recipe
app.post("/api/recipes", async (request, response) => {
  try {
    const newRecipe = new recipeModel(request.body);
    await newRecipe.save();
    response.status(200).send(newRecipe);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

module.exports = app;

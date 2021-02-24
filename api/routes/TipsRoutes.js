const express = require("express");
const tipModel = require("../models/TipModel");

const app = express();

//get all tips
app.get("/api/tips", async (request, response) => {
  try {
    const tips = await tipModel.find({});
    response.status(200).send(tips);
  } catch (err) {
    response.status(500).send(err);
  }
});

//create tip
app.post("/api/tips", async (request, response) => {
  try {
    const newTip = new tipModel(request.body);
    await newTip.save();
    response.status(200).send(newTip);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

module.exports = app;

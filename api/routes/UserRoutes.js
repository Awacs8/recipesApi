const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/UserModel");

const app = express();

//get all users
app.get("/api/users", async (request, response) => {
  try {
    const users = await userModel.find({});
    response.status(200).send(users);
  } catch (err) {
    response.status(500).send(err);
  }
});

//create user
app.post("/api/users", async (request, response) => {
  try {
    const newUser = new userModel(request.body);
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    const user = await userModel.findOne({
      username: request.body.username,
    });
    if (user) {
      response.status(409).send("Username alredy exists");
    }
    await newUser.save();
    response.status(200).send(user);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

//user login
app.post("/api/users/login", async (request, response) => {
  try {
    const user = await userModel.findOne({
      username: request.body.username,
    });
    if (!user) {
      return response.status(404).send("No user found");
    }
    if (!bcrypt.compareSync(request.body.password, user.password)) {
      return response.status(403).send("Incorrect password");
    }
    const token = jwt.sign({ username: user.username }, "secretkey", {
      expiresIn: "60m",
    });
    response.status(200).json({ user, token });
  } catch (err) {
    response.status(500).send(err);
  }
});

//get user by id
app.get("/api/users/:id", async (request, response) => {
  try {
    const user = await userModel.findById({ _id: request.params.id });
    response.status(200).send(user);
  } catch (err) {
    response.status(500).send(err);
  }
});

//save recipe by user Id
app.put("/api/users/:id", async (request, response) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      { _id: request.params.id },
      { $push: { saved_recipes: request.body } }
    );
    user.save();
    response.status(200).send(user);
  } catch (err) {
    response.status(500).send(err);
  }
});

//delete saved recipe by user Id
app.delete("/api/users/:id", async (request, response) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      { _id: request.params.id },
      { $pull: { saved_recipes: request.body.recipe } }
    );
    user.save();
    response.status(200).send(user);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

module.exports = app;

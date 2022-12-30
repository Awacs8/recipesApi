const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./api/routes/UserRoutes");
const recipesRoutes = require("./api/routes/RecipesRoutes");
const tipsRoutes = require("./api/routes/TipsRoutes");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
var cors = require("cors");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config();
app.use(cors());
app.use(userRoutes);
app.use(recipesRoutes);
app.use(tipsRoutes);

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1hokd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.set("strictQuery", true);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongodb");
  });

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening at ${port}`));

const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const users = require("./users.json");
const recipes = require("./recipes.json");
const tips = require("./tips.json");
// const { request, response } = require("express");

// const mysql = require('mysql');
var cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

//miiddlewares
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Methods", "GET", "POST", "PUT", "DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403);
  }
}

//routes-db

// app.get('/db/recipes',(req, res)=>{
//     connection.query('SELECT preparation_step.description FROM preparation_step JOIN recipe ON recipe.recipe_id=preparation_step.recipe_id ORDER BY preparation_step.description',
//     (err, results)=>{
//         if(err){
//             return res.send(err)
//         }
//         else{
//             return res.json({
//                 data: results
//             })
//         }
//     })
// })

//routes-recipes

app.get("/", (request, response) => {
  response.status(200).send("FirstPage!");
});

app.get("/api/recipes", (request, response) => {
  response.json({
    recipes,
  });
});

app.post("/api/recipes", async (request, response) => {
  try {
    const recipe = {
      id: recipes.length + 1,
      name: request.body.name,
      category: request.body.category,
      difficulty: request.body.difficulty,
      preparation_time: request.body.preparation_time,
      ingredients: request.body.ingredients,
      preparation_steps: request.body.preparation_steps,
    };
    recipes.push(recipe);
    response.status(201).send(recipe);
  } catch {
    response.status(500).send();
  }
});

app.get("/api/tips", (request, response) => {
  response.json({
    tips,
  });
});

app.post("/api/tips", async (request, response) => {
  try {
    const tip = {
      id: tips.length + 1,
      title: request.body.title,
      content: request.body.content,
    };
    tips.push(tip);
    response.status(201).send(tip);
  } catch {
    response.status(500).send();
  }
});

//routes-users

//get all users
app.get("/api/users", (request, response) => {
  response.json(users);
});
//get user by id
app.get("/api/users/:id", (request, response) => {
  const user = users.find((user) => user.id === parseInt(request.params.id));
  if (!user) response.status(404).send("No user with given Id!");
  response.status(200).send(user);
});
//create user
app.post("/api/users", async (request, response) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);

    const user = {
      id: uuidv4(),
      email: request.body.email,
      first_name: request.body.first_name,
      last_name: request.body.last_name,
      username: request.body.username,
      password: hashedPassword,
      saved_recipes: [],
    };
    users.push(user);
    response.send(user);
  } catch {
    response.status(500).send();
  }
});

app.put("/api/users/:id", (request, response) => {
  try {
    const user = users.find((user) => user.id === parseInt(request.params.id));
    const body = request.body;
    const index = users.indexOf(user);
    if (!user) {
      response.status(404).send("No user with given Id!");
    } else if (user.saved_recipes.find((recipe) => recipe.id == body.id)) {
      response.status(409).send("Recipe is alredy saved");
    } else {
      const updatedSaved = [...user.saved_recipes, body];
      users[index].saved_recipes = updatedSaved;
      response.status(201).send(user);
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete("/api/users/:id", (request, response) => {
  try {
    const user = users.find((user) => user.id === parseInt(request.params.id));
    const body = request.body;
    const index = users.indexOf(user);
    if (!user) {
      response.status(404).send("No user with given Id");
    } else {
      const newSaved = user.saved_recipes.filter(
        (recipe) => recipe.id !== body.recipe.id
      );
      users[index].saved_recipes = newSaved;
      // console.log(newSaved);
      response.status(200).send(user);
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

// app.put("/api/users/:id", (request, response) => {
//   if (!response.body.id) {
//     return response.status(400).send("UserIsRequired");
//   }
// });

app.post("/api/users/login", async (request, response) => {
  const { username, password } = request.body;
  try {
    const user = users.find((user) => {
      return user.username.toLocaleLowerCase() === username.toLocaleLowerCase();
    });

    if (!user) {
      return response.status(404).send("No user found");
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (passwordCheck) {
      const token = jwt.sign({ username: user.username }, "secretkey");
      response.json({
        user,
        token,
      });
    } else {
      response.status(403).send("Username or password incorrect");
    }
  } catch (error) {
    return response.status(500).send(error);
  }
});

app.listen(port, () => console.log(`Listening at ${port}`));

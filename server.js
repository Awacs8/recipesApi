const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt=require('bcrypt');


const users=require('./users.json');
const recipes=require('./recipes.json');

// const mysql = require('mysql');

app.use(express.json());
app.use(bodyParser.json());

const port=process.env.PORT || 4000;

//miiddlewares
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer=bearerHeader.split(' ')
        const bearerToken=bearer[1]
        req.token=bearerToken
        next()
    }else{
        res.status(403)
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

app.get('/',(req,res)=>{
    res.status(200);
    res.send('FirstPage!');
});

app.get('/api/recipes', (request,response)=>{
response.json({
    recipes
    })
})

app.post('/api/recipes', async(request,response)=>{
    try{
        const recipe = {
            id: recipes.length+1,
            name: request.body.name,
            category: request.body.category,
            difficulty: request.body.difficulty,
            preparation_time: request.body.preparation_time,
            ingredients: request.body.ingredients,
            preparation_steps: request.body.preparation_steps    
        }
        recipes.push(recipe)
        response.send(recipe)
    }
    catch {
        response.status(500).send()
}
})



//routes-users

//get all users
app.get('/api/users',(request,response)=>{
    response.json(users);
})
//get user by id
app.get('/api/users/:id',(request,response)=>{
    const user=users.find(user =>user.id===parseInt(request.params.id));
    if(!user) response.status(404).send('NoUserWithTheGivenId!');
    response.send(user);
})
//create user
app.post('/api/users',async(request,response)=>{
    try{
        const salt=await bcrypt.genSalt()
        const hashedPassword=await bcrypt.hash(request.body.password,salt)
        console.log(salt)
        console.log(hashedPassword)

        const user ={
            id: users.length+1,
            email: request.body.email,
            first_name: request.body.first_name,
            last_name:  request.body.last_name,
            username:   request.body.username,
            password: hashedPassword
        }
    users.push(user);
    response.send(user);
    }
    catch{
        response.status(500).send()
    }
})

app.put('/api/users',(request,response)=>{
    if(!response.body.id){
        return response.status(400).send('UserIsRequired');
    }
})

app.post('/api/users/login', (req, res)=>{
    const {username, hashedPassword} = req.body
    const user = users.find(user=> { return user.username===username
                                    && user.hashedPassword === hashedPassword});
    if(user){
        const token = jwt.sign({ username: user.username, hashedPassword: user.hashedPassword}, 'secretkey');
        res.json({
            user,
            token
        });
    } else {
        res.send('username or password incorrect')
    }
});



app.listen(port, ()=>console.log(`Listening at ${port}`));

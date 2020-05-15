const userRouter = require('./api/users/user.router')

// const Joi = require('joi');
const express = require('express');
const app = express();


const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const users=require('./users.json');
const recipes=require('./recipes.json');
const bcrypt=require('bcrypt');
const mysql = require('mysql');

app.use(express.json());
app.use(bodyParser.json());

app.use('/api/users', userRouter);

const port=process.env.PORT || 4000;

//miiddleware
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

//db
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'recipes',
    password: 'recipes',
    database: 'recipes'
});

function showRecipes(error, ingredients, fields){
    if(error){
        console.log('Error occured', error)
    }
    for (let ingredient of ingredients){
        console.log('Loaded category ', ingredient )
    }
}


//routes-db
app.get('/api/recipes',(req, res)=>{
    connection.query('SELECT preparation_step.description FROM preparation_step JOIN recipe ON recipe.recipe_id=preparation_step.recipe_id ORDER BY preparation_step.description',
    (err, results)=>{
        if(err){
            return res.send(err)
        }
        else{
            return res.json({
                data: results
            })
        }
    })
})



//routes-server-recipes
app.get('/',(req,res)=>{
    res.status(200);
    res.send('FirstPage!');
});

app.get('/json/recipes',(request,response)=>{
response.json({
recipes
    })
})
// app.post('/api/recipes', (request,response)=>{
//     jwt.verify(request.token,(err,user)=>{
//         if(err){
//             response.sendStatus(403);
//         }else{
//             response.json({
//                 message:'RecipeCreated',
//                 authData
//             });
//         }
//     })
// });


//routes-server-users
app.get('/api/users',(request,response)=>{
    response.json(users);
})
app.get('/api/users/:id',(request,response)=>{
    const user=users.find(user =>user.id===parseInt(request.params.id));
    if(!user) response.status(404).send('NoUserWithTheGivenId!');
    response.send(user);
})
// app.post('/api/users',async(request,response)=>{
//     try{
//         const salt=await bcrypt.genSalt()
//         const hashedPassword=await bcrypt.hash(request.body.password,salt)
//         console.log(salt)
//         console.log(hashedPassword)

//         const user ={
//             id: users.length+1,
//             email: request.body.email,
//             first_name: request.body.first_name,
//             last_name:  request.body.last_name,
//             username:   request.body.username,
//             password: hashedPassword
//         }
//     users.push(user);
//     response.send(user);
//     }
//     catch{
//         response.status(500).send()
//     }
// })

app.put('/api/users',(request,response)=>{
    if(!response.body.id){
        return response.status(400).send('UserIsRequired');
    }
})

app.post('/api/login', (req, res)=>{
    const {username, password} = req.body
    const user = users.find(user=> { return user.username===username
                                    && user.password === password});
    if(user){
        const accessToken = jwt.sign({ username: user.username, password: user.password}, verifyToken);
        res.json({
            accessToken
        });
    } else {
        res.send('username or password incorrect')
    }
});

//VerifyToken
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    const token=  bearerHeader && bearerHeader.split(' ')[1];
    if(token==null)
        return  res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        console.log(err)
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}



app.listen(port, ()=>console.log(`Listening at ${port}`));
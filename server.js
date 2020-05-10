// const Joi = require('joi');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const users=require('./users.json');
const recipes=require('./recipes.json');
const bcrypt=require('bcrypt');

app.use(express.json());

const port=process.env.PORT || 4000;

    
app.get('/',(request,response)=>{
    response.status(200);
    response.send('FirstPage!');
});
app.get('/api/users',(request,response)=>{
    response.json(users);
})
app.get('/api/users/:id',(request,response)=>{
    const user=users.find(user =>user.id===parseInt(request.params.id));
    if(!user) response.status(404).send('NoUserWithTheGivenId!');
    response.send(user);
})
app.post('/api/users',async(request,response)=>{
    // const schema={
    //     first_name: Joi.string().min(1).max(10).required(),
    //     last_name:  Joi.string().min(1).max(10).required(),
    //     username: Joi.string().min(1).max(10).required(),
    //     password: Joi.string().min(5).max(30).required,
    //     repeat_password: Joi.ref('password'),
    //     access_token: [Joi.string(), Joi.number()],
    //     email: Joi.string().email({minDomainAtoms:2,tlds:{allow:['com','net']}})  
    // }
    // const result=Joi.validate(request.body,schema);
    // if(result.error){
    //     response.status(400).send(result.error.details[0].message);
    //     return;
    //     }
    try{
        const salt=await bcrypt.genSalt()
        const hashedPassword=await bcrypt.hash(request.body.password,salt)
        console.log(salt)
        console.log(hashedPassword)

        const user ={
            id: users.length+1,
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

app.post('/api/users/login', async(request,response)=>{
    const user=users.find(user=>user.name=request.body.username)
    if(user==null){
        return response.status(400).send('CannotFindUser')
    }
    try{
        if(await bcrypt.compare(request.body.password,user.password)){
            response.send('Success')
        }else{
            response.send('NotAllowed')
        }
    }catch{
        return response.status(400).send()
    }
    // jwt.sign({user},'secretkey',{expiresIn:'30s'},(err,token)=>{
    //     response.json({
    //         token
    //     })
    // })
})

//VerifyToken
function verifyToken(request,response,next){
    const bearerHeader=request.headers['authorization'];
    const token=  bearerHeader && bearerHeader.split(' ')[1];
    if(token==null)
        return  response.sendStatus(401)

        
}
app.post('/api/recipes',verifyToken, (request,response)=>{
    jwt.verify(request.token,(err,user)=>{
        if(err){
            response.sendStatus(403);
        }else{
            response.json({
                message:'RecipeCreated',
                authData
            });
        }
    })
});
app.get('/api/recipes',(request,response)=>{
    response.json({
        recipes
    })
})
app.listen(port, ()=>console.log(`Listening at ${port}`));
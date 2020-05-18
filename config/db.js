const {createPool} = require('mysql');


const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB
});


// function showRecipes(error, ingredients, fields){
//     if(error){
//         console.log('Error occured', error)
//     }
//     for (let ingredient of ingredients){
//         console.log('Loaded category ', ingredient )
//     }
// }

// app.get('/api/recipes',(req, res)=>{
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

module.exports = pool
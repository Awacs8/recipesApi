
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


var request = require('request')

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-e7216dse.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://recipes/api',
  issuer: 'https://dev-e7216dse.eu.auth0.com/',
  algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});

app.get('/public', function(req, res) {
    res.json({
      message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
  });

app.get('/private', jwtCheck, function(req, res) {
    res.json({
      message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
  });



var options = { method: 'POST',
  url: 'https://dev-e7216dse.eu.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"sqhZJQ72xx7XgzK0vwLqMSZV2rQQucfS","client_secret":"c0y_EO3a-AaV4LHUO6kOfBEk_Q8Vm-FyFO2CBnRPc-AEcXy6h4rEInMqv4PNl8px","audience":"https://recipes/api","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

var options = { method: 'GET',
  url: 'https://dev-e7216dse.eu.auth0.com/oauth/token',
  headers: { authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVuRkNYUHNCNmF1R013cDVSNHpoeiJ9.eyJpc3MiOiJodHRwczovL2Rldi1lNzIxNmRzZS5ldS5hdXRoMC5jb20vIiwic3ViIjoic3FoWkpRNzJ4eDdYZ3pLMHZ3THFNU1pWMnJRUXVjZlNAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcmVjaXBlcy9hcGkiLCJpYXQiOjE1ODkyOTc4MDgsImV4cCI6MTU4OTM4NDIwOCwiYXpwIjoic3FoWkpRNzJ4eDdYZ3pLMHZ3THFNU1pWMnJRUXVjZlMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.VkShtWa7KuBtWUTGrRtqTY0quiWXXwnRQF_V0QxBrfwNq323GLqv3xzvpFaNAVPsUoGNoAfb3nQjkWyi95Qe63MoySS4J-rrDf1Mpnykwg0iVWyfoANERAr0BKHm7qnBcDqYAUdLkEsNyl0jdMqBVs05-JsA0TwoHGoTSE6XgapBqmu05NKbdOxXKJD8EVuWIJRiH2REEUs2AF1sDIsND5gtjDvVy3ERM5r409Z4l41cZ52eM6IA2hFPT3KuBYZfNIhRNk0hqR56SMnKX96KyvpFepmFeULc-0vRi81PSPWeGFRa843n43g-SeGqIpYPlsn0PYi4-Voy-_RlbMkmTw' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log('');
});
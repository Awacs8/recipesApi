const user ={
    id: users.length+1,
    first_name: request.body.first_name,
    last_name:  request.body.last_name,
    username:   request.body.username,
    email:  request.body.email,
    password: request.body.password
}
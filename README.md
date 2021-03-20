# FriendlyRecipes API documentation

URL: https://recipes-for-friends-api.herokuapp.com/

API documentation for <a href="https://friendlyrecipes.netlify.app/">Friendly recipes</a> web app.

## USER ENDPOINTS

### All users

METHOD: `GET`
ENDPOINT: `/api/users`
RESPONSE:
STATUS: `200`

<pre>
[
    {
        "saved_recipes": [],
        "_id": "60474f8f5c61ae000433f63b",
        "first_name": "test",
        "last_name": "test",
        "email": "as@hj.jk",
        "username": "nana",
        "password": "$2b$10$8U.ZmmHC5I8B1A8TkFAQU.1YZIRiO.3gsrbE4kSWDUCODofwyU7e6",
        "__v": 0
    },
    {
        "saved_recipes": [],
        "_id": "605628eebe9ec60004a39d0f",
        "first_name": "First Name",
        "last_name": "Last Name",
        "email": "mail@ma.il",
        "username": "username",
        "password": "$2b$10$tnScHH4aT/H2eJ8zkfwcLuX9SJZZAznHV2fE9jiA/6KPBakRPX38S",
        "__v": 0
    }
]
</pre>

STATUS: `500` "server error"

### Single user

METHOD: `GET`
ENDPOINT: `/api/users/605628eebe9ec60004a39d0f`
RESPONSE:
STATUS: `200`

<pre>
{
    "saved_recipes": [],
    "_id": "605628eebe9ec60004a39d0f",
    "first_name": "First Name",
    "last_name": "Last Name",
    "email": "mail@ma.il",
    "username": "username",
    "password": "$2b$10$tnScHH4aT/H2eJ8zkfwcLuX9SJZZAznHV2fE9jiA/6KPBakRPX38S",
    "__v": 0
}
</pre>

STATUS: `500` "server error"

### User registration

METHOD: `POST`
ENDPOINT: `/api/users`
REQUEST:

<pre>
{
    "first_name":"First Name",
    "last_name":"Last Name",
    "email":"mail@ma.il",
    "username": "Username",
    "password": "password"
}
</pre>

RESPONSE:

STATUS: `200`

<pre>
{
    "saved_recipes": [],
    "_id": "605628eebe9ec60004a39d0f",
    "first_name": "First Name",
    "last_name": "Last Name",
    "email": "mail@ma.il",
    "username": "username",
    "password": "$2b$10$tnScHH4aT/H2eJ8zkfwcLuX9SJZZAznHV2fE9jiA/6KPBakRPX38S"
}
</pre>

STATUS: `409` "username already exists"
STATUS: `500` "server error"

### User authentication

METHOD: `POST`
ENDPOINT: `/api/users/login`
REQUEST:

<pre>
{
    "username": "Username",
    "password": "password"
}
</pre>

RESPONSE:

STATUS: `200`

<pre>
{
    "user": {
        "saved_recipes": [],
        "_id": "605628eebe9ec60004a39d0f",
        "first_name": "First Name",
        "last_name": "Last Name",
        "email": "mail@ma.il",
        "username": "username",
        "password": "$2b$10$tnScHH4aT/H2eJ8zkfwcLuX9SJZZAznHV2fE9jiA/6KPBakRPX38S",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWF0IjoxNjE2MjU5NDk3LCJleHAiOjE2MTYyNjMwOTd9.94h1a3hS_ACkxSGPMBLI64I_WhG7BBQRrvUYLyWvZdM"
}
</pre>

STATUS: `403` "username already exists"
STATUS: `404` "Incorrect password"
STATUS: `500` "server error"

### Saving recipe

METHOD: `PUT`
ENDPOINT: `/api/users/:user_id`
REQUEST:

<pre>
{
        "_id": "602fd074cef9022070baaafc",
        "category": "testa/pite",
        "title": "Proja",
        "difficulty": "lako",
        "preparation_time": 30,
        "ingredients": [
            {
                "_id": "602fd074cef9022070baaafd",
                "ingName": "kukuruzno brašno",
                "quantity": 3,
                "unit_of_measure": "šolja"
            },
            ...
        ],
        "preparation_steps": [
            "pomešati suve sastojke",
            ...
            "peći u prethodno zagrejanoj rerni na 180 do 200 stepeni 30-40 minuta"
        ]
    }
</pre>

STATUS: `500` "server error"

### Deleting recipe from saved

METHOD: `DELETE`
ENDPOINT: `/api/users/:user_id`
REQUEST:

<pre>
{
        "_id": "602fd074cef9022070baaafc",
        "category": "testa/pite",
        "title": "Proja",
        ...
}
</pre>

STATUS: `500` "server error"

## RECIPE ENDPOINTS

### All recipes

METHOD: `GET`
ENDPOINT: `/api/recipes`
RESPONSE:
STATUS: `200`

<pre>
[
    {
        "_id": "602fd074cef9022070baaafc",
        "category": "testa/pite",
        "title": "Proja",
        "difficulty": "lako",
        "preparation_time": 30,
        "ingredients": [
            {
                "_id": "602fd074cef9022070baaafd",
                "ingName": "kukuruzno brašno",
                "quantity": 3,
                "unit_of_measure": "šolja"
            },
            ...
        ],
        "preparation_steps": [
            "pomešati suve sastojke",
            ...
            "peći u prethodno zagrejanoj rerni na 180 do 200 stepeni 30-40 minuta"
        ],
        "__v": 0
    }
    ...
]
</pre>

STATUS: `500` "server error"

### Single recipe

METHOD: `GET`
ENDPOINT: `/api/recipes/602fd074cef9022070baaafc`
RESPONSE:
STATUS: `200` same as simple above but Object type
STATUS: `500` "server error"

### Create recipe

METHOD: `POST`
ENDPOINT: `/api/recipes`
REQUEST:

<pre>
{
    "title": "Kakao-lešnik namaz",
    "category": "namazi",
    "difficulty": "lako",
    "preparation_time": 30,
    "ingredients": [
      {
        "ingName": "pečeni lešnici",
        "quantity": 100,
        "unit_of_measure": "g"
      },
      ...
    ],
    "preparation_steps": [
      "Samleti u blenderu lešnike sa malo vode.",
      ...
      "Na kraju dodati ektrakt vanile."
    ]
  }
</pre>

RESPONSE:
STATUS: `200`

<pre>
{
    "_id": "602fd074cef9022070baaafc",
    "title": "Kakao-lešnik namaz",
    "category": "namazi",
    "difficulty": "lako",
    "preparation_time": 30,
    "ingredients": [
      {
        "ingName": "pečeni lešnici",
        "quantity": 100,
        "unit_of_measure": "g"
      },
      ...
    ],
    "preparation_steps": [
      "Samleti u blenderu lešnike sa malo vode.",
      ...
      "Na kraju dodati ektrakt vanile."
    ],
    "__v": 0
  }
</pre>

STATUS: `500` "server error"

## TIPS ENDPOINTS

### All tips

METHOD: `GET`
ENDPOINT: `/api/tips`
RESPONSE:
STATUS: `200`

<pre>
[
    {
        "_id": "604750935c61ae000433f63c",
        "title": "",
        "content": "1tbsp=3tsp=17g;",
        "__v": 0
    }
]
</pre>

STATUS: `500` "server error"

### Send the tip

METHOD: `POST`
ENDPOINT: `/api/tips`
REQUEST:

<pre>
{
    "title":"Tip title",
    "content":"Tip text"
}
</pre>

RESPONSE:
STATUS: `200`

<pre>
{
    "_id": "604750935c61ae000433f63c",
    "title":"Tip title",
    "content":"Tip text"
    "__v": 0
}

</pre>

STATUS: `500` "server error"

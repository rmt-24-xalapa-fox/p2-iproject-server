# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /registerCustomer` 
- `POST /registerBarber` 
- `POST /loginCustomer` 
- `POST /loginBarber` 

- `POST /google-sign`

- `GET /customer/transactions` 
- `GET /customer/barbers`
- `GET /customer/favorite`
- `POST /customer/favorite/:BarberId`
- `POST /customer/transaction/:BarberId` 
- `GET /barber/transactions`
- `PUT /barber/price`
- `PUT /barber/updateStatus/:transId`

&nbsp;

## 1. GET /customer/transactions
Description:
- Get all movies

_Response (200 - OK)_

```json
{
    "statusCode": 200,
    "data": []
}
```

&nbsp;

## 2. GET /customer/barbers
Description:
- Get movie by id

Request:

- Params:

```json
{
    "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "statusCode": 200,
    "data": [
    {
        "id": 1,
        "email": "budi@gmail.com",
        "password": "Budii",
        "name": "Budi",
        "price": 12000,
        "location": "Jakarta",
        "profile_image": "profileImg",
        "rating": 0,
        "ratingCount": 0,
        "createdAt": "2022-06-23T00:50:57.116Z",
        "updatedAt": "2022-06-23T00:50:57.116Z"
    },
    {
        "id": 2,
        "email": "younglex@gmail.com",
        "password": "young",
        "name": "Young",
        "price": 201000,
        "location": "Bandung",
        "profile_image": "profileImg",
        "rating": 0,
        "ratingCount": 0,
        "createdAt": "2022-06-23T00:50:57.116Z",
        "updatedAt": "2022-06-23T00:50:57.116Z"
    },
    {
        "id": 3,
        "email": "arilasso@gmail.com",
        "password": "arilasso",
        "name": "Ari",
        "price": 500000,
        "location": "Kalimantan",
        "profile_image": "profileImg",
        "rating": 0,
        "ratingCount": 0,
        "createdAt": "2022-06-23T00:50:57.116Z",
        "updatedAt": "2022-06-23T00:50:57.116Z"
    },
    {
        "id": 4,
        "email": "noah@gmail.com",
        "password": "noaah",
        "name": "Noah",
        "price": 1200000,
        "location": "Sumatera",
        "profile_image": "profileImg",
        "rating": 0,
        "ratingCount": 0,
        "createdAt": "2022-06-23T00:50:57.116Z",
        "updatedAt": "2022-06-23T00:50:57.116Z"
    },
    {
        "id": 5,
        "email": "varrel@gmail.com",
        "password": "varell",
        "name": "Varrel",
        "price": 30000,
        "location": "Aceh",
        "profile_image": "profileImg",
        "rating": 0,
        "ratingCount": 0,
        "createdAt": "2022-06-23T00:50:57.116Z",
        "updatedAt": "2022-06-23T00:50:57.116Z"
    },
    {
        "id": 6,
        "email": "joko@gmail.com",
        "password": "jokowi",
        "name": "Jokowi",
        "price": 3000000,
        "location": "Bogor",
        "profile_image": "profileImg",
        "rating": 0,
        "ratingCount": 0,
        "createdAt": "2022-06-23T00:50:57.116Z",
        "updatedAt": "2022-06-23T00:50:57.116Z"
    },
    {
        "id": 7,
        "email": "bahlil@gmail.com",
        "password": "bahliil",
        "name": "Bahlil",
        "price": 20000,
        "location": "Tanggerang",
        "profile_image": "profileImg",
        "rating": 0,
        "ratingCount": 0,
        "createdAt": "2022-06-23T00:50:57.116Z",
        "updatedAt": "2022-06-23T00:50:57.116Z"
    },
    {
        "id": 8,
        "email": "nadim@gmail.com",
        "password": "nadim",
        "name": "Nadim",
        "price": 20000,
        "location": "Jakarta",
        "profile_image": "profileImg",
        "rating": 0,
        "ratingCount": 0,
        "createdAt": "2022-06-23T00:50:57.116Z",
        "updatedAt": "2022-06-23T00:50:57.116Z"
    },
    {
        "id": 9,
        "email": "yudi@gmail.com",
        "password": "yudis",
        "name": "Yudi",
        "price": 120003,
        "location": "Pontianak",
        "profile_image": "profileImg",
        "rating": 0,
        "ratingCount": 0,
        "createdAt": "2022-06-23T00:50:57.116Z",
        "updatedAt": "2022-06-23T00:50:57.116Z"
    },
    {
        "id": 10,
        "email": "sahroni@gmail.com",
        "password": "sahroni",
        "name": "Sahroni",
        "price": 301000,
        "location": "Belitung",
        "profile_image": "profileImg",
        "rating": 0,
        "ratingCount": 0,
        "createdAt": "2022-06-23T00:50:57.116Z",
        "updatedAt": "2022-06-23T00:50:57.116Z"
    }
]
}
```

_Response (404 - Not Found)_

```json
{
    "statusCode": 404,
    "error": {
        "message": "Error Not Found"
    }
}
```
&nbsp;

## 3. POST /customer/favorite
Description:
- Add a movie

Request:

- body:

```json
{
  "title": "string",
  "synopsis": "text",
  "trailerUrl": "string",
  "imgUrl": "string",
  "rating": "integer", //minimal rating: 1
  "authorId": "integer",
  "genreId": "integer"
}
```

_Response (201 - Created)_

```json
{
    "statusCode": 201,
    "data": {
        "id": 29,
        "title": "The Prestige",
        "synopsis": "Two friends and fellow magicians become bitter enemies after a sudden tragedy. As they devote themselves to this rivalry, they make sacrifices that bring them fame but with terrible consequences.\n",
        "trailerUrl": "https://www.youtube.com/watch?v=RLtaA9fFNXU",
        "imgUrl": "https://www.google.com/search?tbm=isch&q=Prestige,+The",
        "rating": 3,
        "AuthorId": 2,
        "GenreId": 1,
        "updatedAt": "2022-06-01T06:17:07.942Z",
        "createdAt": "2022-06-01T06:17:07.942Z"
    }
}
```

_Response (400 - Bad Request)_

```json
{
    "statusCode": 400,
    "error": {
        "message": [
            "Title is empty",
            "Synopsis is empty",
            "Minimal rating: 1"
        ]
    }
}
```

&nbsp;

## 4. PUT /barber/transactions
Description:
- Edit movie by id

Request :

- body:

```json
{
  "title": "string",
  "synopsis": "text",
  "trailerUrl": "string",
  "imgUrl": "string",
  "rating": "integer", //Minimal rating: 1
  "authorId": "integer",
  "genreId": "integer"
}
```

- Params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "statusCode": 200,
    "data": {
        "id": 19,
        "title": "The Dark Knight",
        "synopsis": "After Gordon, Dent and Batman begin an assault on Gotham's organised crime, the mobs hire the Joker, a psychopathic criminal mastermind who offers to kill Batman and bring the city to its knees.",
        "trailerUrl": "https://www.youtube.com/watch?v=LDG9bisJEaI",
        "imgUrl": "https://contentserver.com.au/assets/598411_p173378_p_v8_au.jpg",
        "rating": 1,
        "AuthorId": 3,
        "GenreId": 3,
        "createdAt": "2022-05-30T17:26:23.581Z",
        "updatedAt": "2022-06-01T06:44:10.729Z"
    }
}
```

_Response (400 - Bad Request)_

```json
{
    "statusCode": 400,
    "error": {
        "message": [
            "Title is empty",
            "Synopsis is empty",
            "Minimal rating: 1"
        ]
    }
}
```

_Response (404 - Not Found)_

```json
{
    "statusCode": 404,
    "error": {
        "message": "Error Not Found"
    }
}
```

&nbsp;

## 5. DELETE /barber/transactions
Description:
- Delete movies by id

Request :

- Params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "statusCode": 200,
    "message": "Movie Success to delete"
}
```

_Response (404 - Not Found)_

```json
{
    "statusCode": 404,
    "error": {
        "message": "Error Not Found"
    }
}
```

## 6. POST /registerCustomer
Description:
- Register account

Request :

- body:

```json
{
  "username": "string",
  "email": "text",
  "password": "string",
  "phoneNumber": "string",
  "address": "integer",
  "authorId": "integer",
  "genreId": "integer"
}
```

_Response (201 - OK)_

```json
{
    "statusCode": 201,
    "data": {
        "message": "user has been created",
        "newUser": {
            "id": "19",
            "email": "matthew@gmail.com"    
        }
    }
}
```

_Response (400 - Bad Request)_

```json
{
    "statusCode": 400,
    "error": {
        "message": [
            "Email is empty",
            "Email has to be in email format",
            "Password is empty",
            "Password has to be more than 5 characters"
        ]
    }
}
```

&nbsp;

## 7. POST /loginCustomer
Description:
- Login account

Request :

- body:

```json
{
  "email": "string",
  "password": "string",
}
```

_Response (200 - OK)_

```json
{
    "statusCode": 200,
    "data": {
        "id": 1,
        "name": "nolan",
        "role": "Admin",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU0OTM2NDcxfQ.6N6jCRuRxpRVbDb8xzz5iPc7nFgAAr1AEGPnj3YbAZA"
    }
}
```

_Response (401 - Bad Request)_

```json
{
    "statusCode": 401,
    "error": {
        "message": "Invalid Email / Password"
    }
}
```

&nbsp;

## 8. GET /barber/price
Description:
- Get history of movies


_Response (200 - OK)_

```json
{
    "statusCode": 200,
    "data": [
        {
            "id": 1,
            "title": "The Dark Knight",
            "description": "Movie with ID 1 has been updated from Active into Inactive",
            "updatedBy": "nolan123@gmail.com",
            "MovieId": 1,
            "createdAt": "2022-06-06T18:20:22.997Z",
            "updatedAt": "2022-06-06T18:20:22.997Z"
        }
}
```

&nbsp;

## 9. PATCH  /barber/updateStatus/:transId
Description:
- Get history of movies

request: 
- params:
```json
 {
    "id":"id"
}
```

_Response (200 - OK)_

```json
{
    "statusCode": 200,
    "data": {
        "historyUpdate": "Movie with ID: 1 has been updated from Inactive into Active"
    }
}
```

&nbsp;


## Global Error
 
_Response (401 - Unauthorized)_
 
```json
{
   "statusCode": 401,
   "errors": {
       "message": "Invalid Token"
   }
}
```
 
_Response (500 - Internal Server Error)_
 
```json
{
   "statusCode": 500,
   "errors": {
       "message": "Internal Server Error"
   }
}
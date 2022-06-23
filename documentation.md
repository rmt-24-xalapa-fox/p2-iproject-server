<h1>Endpoints</h1>

> #### List of endpoint:
>
> - `POST` /register
> - `POST` /login
> - `GET` /
> - `GET` /read-more/:id
> - `PUT` /mypoem/:id
> - `POST` /create-poem
> - `Global Error`
> - `Invalid Error`

<h1>POST /register</h1>

**Description**

> - Create new user

**Response**

201

**Body**

```js
{
    "email": String,
    "username": String
}
```

<h1>POST /login</h1>

**Description**

> - User login

**Response**

200

**Body**

```js
{
    "id": Integer,
    "email": String,
    "access_token": String
}
```

<h1>GET /</h1>

**Description**

> - Get all data

**Response**

200

**Body**

```js
{
    "data": [
        {
            "id": Integer,
            "title": String,
            "author": String,
            "content": String,
            "UserId": Integer,
            "createdAt": Date,
            "updatedAt": Date
        },
    ]
}
```

<h1>GET /read-more/:id</h1>

**Description**

> - Get detail data

**Response**

200

**Body**

```js
{
    "detail": {
        "id": Integer,
        "title": String,
        "author": String,
        "content": String,
        "UserId": Integer,
        "createdAt": Date,
        "updatedAt": Date
    }
}
```

<h1>GET /mypoem/:id</h1>

**Description**

> - Get mypoem data

**Response**

200

**Body**

```js
[
    {
        "id": Integer,
        "title": String,
        "author": String,
        "content": String,
        "UserId": Integer,
        "createdAt": Date,
        "updatedAt": Date
    }
]
```

<h1>POST /create-poem</h1>

**Description**

> - create new data

**Response**

201

**Body**

```js
{
        "id": Integer,
        "title": String,
        "author": String,
        "content": String,
        "UserId": Integer,
        "createdAt": Date,
        "updatedAt": Date
    }
```

<h1>Global Error</h1>

**Response**

500

**Body**

```js
{
  "statusCode": 500,
  "error": {
        "message": "Internal Server Error"
  }
}
```

<h1>Invalid Error</h1>

**Response**

401

**Body**

```js
{
    "statusCode": 401,
    "error": {
        "message": "Invalid email/password"
    }
}
```



# Music Yuhu API Documentation

&nbsp;

## Models :

_User_

```
- email : string, required, unique
- name : string, required
- password : string, required
```


## Relation :


## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`

Routes below need authentication:

- `GET /getsong`
- `POST /tokenpayment`
- `GET /top10radio`


&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "name": "string",
  "password": "string",
  "status": "string",

}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "name": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Name is required"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /top10radio

Description:
- Get top 10 votes radio station from radio-browser API

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "name": "string",
    "url1": "string",
    "usrl2": "string",
    "Country": "string",
    "TotalVotes": "string",
    "official_website": "string"
  },
  ...,
]
```

_Response (404 - not found)_

```json
{
  "message": "Radio station not found"
}
```

&nbsp;

## 4. get /tokenpayment

Description:
- give the token payment

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (201 - Created)_

```json
{
  "Token Payment": "string"
}
```

_Response (401 - Forbidden)_

```json
{
  "message": "Transaction failed"
}
```

&nbsp;

## 5. GET /getsong

Description:
- Get top 10 chart song from musixmatch API

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "title": "string",
    "rating": "integer",
    "album": "string",
    "artistName": "string",
    "songUrl": "string"
  },
  ...,
]
```


_Response (404 - Not Found)_

```json
{
  "message": "Songs not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
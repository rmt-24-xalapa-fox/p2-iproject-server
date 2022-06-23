# INSTALITE

INSTALITE - Server

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`

- `GET /posts/myposts`
- `GET /posts`
- `POST /posts/upload`

- `GET /posts/likes/:PostId`
- `POST /posts/likes/:PostId`

- `POST /follow/:UserFollowingId`
- `GET /followings/:UserId`
- `GET /followers/:UserId`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "email": STRING,
  "password": STRING,
  "username": STRING,
  "address": STRING,
  "moto": STRING,
}
```

_Response (201 - Created)_

```json
{
  "message": "User created"
}
```

_Response (400 - Bad Request)_

Example:

```json
{
  "message": "email must be unique"
}
```

or

```json
{
    "message": [Validation and Constraint Error]
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": STRING,
  "password": STRING,
}
```

_Response (200 - OK)_

```json
Example:
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU1OTU0MzkxfQ.j7CX5CWaZXrHuO2IIzwZk9JmRzSElN3rE0qowCaX4eY",
    "id": 1,
    "email": "user1@gmail.com",
    "username": "user1",
    "address": "alamat user 1",
    "moto": "moto user 1",
    "avatar": "https://avatars.dicebear.com/api/avataaars/:seed.svg"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
```

```json
{
  "message": "Password is required"
}
```

&nbsp;

## 3. GET /posts/myposts

Request:

- headers:

```json
{
  "access_token": STRING
}
```

_Response (200 - OK)_

```json
Example:
[
    {
        [Post] (Post Object)
    },
    {
        [Post] (Post Object)
    },
    ...
]
```

&nbsp;

## 4. GET /posts

Request:

- headers:

```json
{
  "access_token": STRING
}
```

_Response (200 - OK)_

```json
Example:
[
    {
        [Post] (Post Object)
    },
    {
        [Post] (Post Object)
    },
    ...
]
```

&nbsp;

## 5. POST /posts/upload

Request:

- headers:

```json
{
  "access_token": STRING
}
```

- body:

```json
{
    "imageUrl": [File],
    "caption": STRING
}
```

_Response (201 - Created)_

```json
{
  "message": "Upload success"
}
```

&nbsp;

## 6. GET /posts/likes/:PostId

Request:

- params:

```json
{
    "PostId": INTEGER
}
```

- headers:

```json
{
  "access_token": STRING
}
```

_Response (200 - OK)_

```json
[
    {
        [Post] (Post Object)
    },
    {
        [Post] (Post Object)
    },
    ...
]
```

&nbsp;

## 7. POST /posts/likes/:PostId

Request:

- params:

```json
{
    "PostId": INTEGER
}
```

- headers:

```json
{
  "access_token": STRING
}
```

_Response (201 - Created)_

```json
{
  "message": "You are already like"
}
```

&nbsp;

## 8. POST /follow/:UserFollowingId

Request:

- params:

```json
{
    "UserFollowingId": INTEGER
}
```

- headers:

```json
{
  "access_token": STRING
}
```

_Response (201 - Created)_

```json
{
  "message": "You following the user"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "You have been following the user"
}
or
{
    "message": "Cannot following your self"
}
```

&nbsp;

## 9. GET /followings/:UserId

Request:

- params:

```json
{
    "UserId": INTEGER
}
```

- headers:

```json
{
  "access_token": STRING
}
```

_Response (200 - OK)_

```json
Example:
[
    {
        [Following] (Following Object)
    },
    {
        [Following] (Following Object)
    },
    ...
]
```

&nbsp;

## 10. GET /followers/:UserId

Request:

- params:

```json
{
    "UserId": INTEGER
}
```

- headers:

```json
{
  "access_token": STRING
}
```

_Response (200 - OK)_

```json
Example:
[
    {
        [Follower] (Follower Object)
    },
    {
        [Follower] (Follower Object)
    },
    ...
]
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

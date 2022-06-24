# p2-iproject-server
Individual Project - Server - InstaVue

Avaliable Endpoint for public:
- GET '/post'
- GET '/post/:id'
- POST '/users/login'
- POST '/users/loginGoogle'
- POST '/users/register'
- POST '/users/registerAdmin'

Require Authentication
- GET '/mypost'
- POST '/post'
- POST '/post/:id/comments'
- GET '/favourite'

- POST '/favourite/:id'
- DELETE '/favourite/:id'

- POST '/users/coinPrice'
- POST '/users/getInvoices'
- POST '/users/getLink/:id'
- POST '/users/buyCoin/:id'
- POST '/users/giftCoin/:id'

Require Authorization
- PATCH '/post/:id'

- POST '/users/addPrice'


#Avaliable for public
## 1. GET '/post'
Return all avaliable post within query search,limit and offset and whether user already logged in or no

_Response (200 - OK)_

```json
{
    {
    "Posts": [
        {
            "id": 'number',
            "title": "string",
            "media": "string",
            "UserId": 'number',
            "description": "string",
            "createdAt": "date",
            "updatedAt": "date",
            "User": {
                "email": "string"
            }
        }
    ]
    }
}
```
headers:

```json
{
  "access_token": "string"
}
```

```json
{
    {
    "Posts": [
        {
            "id": 'number',
            "title": "string",
            "media": "string",
            "UserId": 'number',
            "description": "string",
            "createdAt": "date",
            "updatedAt": "date",
            "User": {
                "email": "string"
            },
            "canDonate": "boolean"
        }
    ]
    }
}
```

## 2. GET '/post/:id'
Return detail of post with all avaliable comment
_Response (200 - OK)_

```json
{
    "Posts": [
        {
            "id": "integer",
            "title": "string",
            "media": "string",
            "UserId": "integer",
            "description": "string",
            "createdAt": "date",
            "updatedAt": "date",
        }
    ]
    "Comments": [
        {
            "id": "integer",
            "CommentId": "integer",
            "PostId": "integer",
            "createdAt": "date",
            "updatedAt": "date",
            "Comment": {
                "id": "integer",
                "comment": "string",
                "UserId": "integer",
                "createdAt": "date",
                "updatedAt": "date",
                "User": {
                    "email": "string",
                    "nickname": "string"
                }
            }
        }
    ]
}
```
_Response (404 - Not found)_

```json
{
    "message": "Not found"
}
```
## 3. POST '/users/login'
Return access token,email and role if credential is valid

body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
    "access_token": "string",
    "email": "string",
    "role": "string"
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
  "message": "Auth failed"
}
```

## 4. POST '/users/loginGoogle'
Unregistered user will be registered and existing user role will become customer, then return access token,email and role if credential is valid.

Email will be sent to user logged in via google sign in

- Headers:

```json
{
  "token": "string",
}
```
_Response (200 - OK)_

```json
{
    "access_token": "string",
    "email": "string",
    "role": "string"
}
```
_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

## 5. POST '/users/register'
Register user as customer

body:

```json
{
  "email": "string",
  "username": "string",
  "nickname": "string",
  "dateOfBirth": "date",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
    "access_token": "string",
    "email": "string",
    "role": "string"
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
OR
{
    "message": "Email is used"
}
```

## 6.  POST '/users/registerAdmin'
Register user as admin

body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
    "access_token": "string",
    "email": "string",
    "role": "string"
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
OR
{
  "message": "Email is used"
}
```

#Avaliable after logged in
## 1. GET '/mypost'
Return all post made by the user

headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    {
    "Posts": [
        {
            "id": "integer",
            "title": "string",
            "media": "string",
            "UserId": "integer",
            "description": "string",
            "createdAt": "date",
            "updatedAt": "date",
            "User": {
                "email": "string"
            },
            "canDonate": false
        }
    ]
    }
}
```
_Response (401 - Unauthorized)_
```json
{
    "message": "Token invalid"
}
```

## 2. POST '/post'
Create a new post if all required input is correct
body:

```json
{
  "title": "string",
  "description": "string",
  "media": "string"
}
```

_Response (200 - OK)_

```json
{
    "message": "Post created"
}
```

_Response (400 - Invalid data)_

```json
{
    "message": "Invalid input"
}
```

## 3. POST '/post/:id/comments'
## 4. GET '/favourite'

## 5. POST '/favourite/:id'
## 6. DELETE '/favourite/:id'

## 7. POST '/users/coinPrice'
## 8. POST '/users/getInvoices'
## 9. POST '/users/getLink/:id'
## 10. POST '/users/buyCoin/:id'
## 11. POST '/users/giftCoin/:id'

#Avaliable to specific users
## 1. PATCH '/post/:id'

## 2. POST '/users/addPrice'
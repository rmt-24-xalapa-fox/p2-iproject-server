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
- POST '/promotePost/:id'

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
                "email": "admin@mail.com"
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
                "email": "admin@mail.com"
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
    "statusCode": 404,
    "message": "Not found"
}
```
## 3. POST '/users/login'
Return access token if credential is valid

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

## 5. POST '/users/register'
## 6.  POST '/users/registerAdmin'
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


headers:

```json
{
  "access_token": "string"
}
```
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
_Response (401 - Unauthorized)_
```json
{
    "message": "Token invalid"
}
```

## 3. POST '/post/:id/comments'
Create a comment on the post


headers:

```json
{
  "access_token": "string"
}
```
body:
```json
{
  "comment": "string"
}
```

_Response (200 - OK)_

```json
{
    "message": "Comment created"
}
```

_Response (400 - Invalid data)_

```json
{
    "message": "Invalid input"
}
```
_Response (401 - Unauthorized)_
```json
{
    "message": "Token invalid"
}
```
_Response (404 - Not found)_
```json
{
    "message": "Not found"
}
```
## 4. GET '/favourite'
Will return all favourited post
headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "Favourites": [
        {
            "id": "integer",
            "PostId": "integer",
            "UserId": "integer",
            "createdAt": "date",
            "updatedAt": "date",
            "Post": {
                "id": "integer",
                "title": "string",
                "media": "string",
                "UserId": "integer",
                "description": "string",
                "createdAt": "date",
                "updatedAt": "date"
            }
        }
    ]
}
```
_Response (401 - Unauthorized)_
```json
{
    "message": "Token invalid"
}
```
## 5. POST '/favourite/:id'
Add a post to favourite

headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "message": "Post favourited"
}
```

_Response (400 - Invalid data)_

```json
{
    "message": "Invalid input"
}
```
_Response (401 - Unauthorized)_
```json
{
    "message": "Token invalid"
}
```
_Response (404 - Not found)_
```json
{
    "message": "Not found"
}
```
## 6. DELETE '/favourite/:id'
Will remove post from favourite

headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "message": "Post unfavourited"
}
```

_Response (401 - Unauthorized)_
```json
{
    "message": "Token invalid"
}
```

_Response (404 - Not found)_
```json
{
    "message": "Unfavourited failed"
}
```

## 7. GET '/users/coinPrice'
Will return all coin with it price
headers:

```json
{
  "access_token": "string"
}
```
_Response (200 - OK)_

```json
[
    {
        "id": "integer",
        "coinAmmount": "integer",
        "price": "integer",
        "createdAt": "date",
        "updatedAt": "date"
    }
]
```

_Response (401 - Unauthorized)_
```json
{
    "message": "Token invalid"
}
```
## 8. POST '/users/getInvoices'
Will get invoices then check if its been paid or not, then add coin to user wallets
headers:

```json
{
  "invoice_link": "string"
}
```
_Response (200 - OK)_

```json
[
    {
        "message": "Payment have been processed"
    }
]
```
_Response (400 - Invalid data)_

```json
[
    {
        "message": "Payment not done"
    }
]
```
_Response (401 - Unauthorized)_
```json
{
    "message": "Token invalid"
}
```
_Response (404 - Not found)_
```json
{
    "message": "Link not found"
}
```
## 9. POST '/users/getLink/:id'
Will create an invoice link based on coin that being bought
headers:

```json
{
  "access_token": "string"
}
```
_Response (200 - OK)_

```json
{
"https://checkout-staging.xendit.co/web/token_link"
}
```

_Response (401 - Unauthorized)_
```json
{
    "message": "Token invalid"
}
```


_Response (404 - Not found)_
```json
{
    "message": "Not found"
}
```

## 10. POST '/users/buyCoin/:id'
Add coin directly to user wallet without payment gateway
headers:

```json
{
  "access_token": "string"
}
```
_Response (200 - OK)_

```json
{
    "message": "Coin has been added"
}
```

_Response (401 - Unauthorized)_
```json
{
    "message": "Token invalid"
}
```
_Response (404 - Unauthorized)_
```json
{
    "message":"Not found"
}
```

## 11. POST '/users/giftCoin/:id'
Transfer coin from a user to another user
headers:

```json
{
  "access_token": "string"
}
```
body:

```json
{
  "total": "integer"
}
```
_Response (200 - OK)_

```json
{
    "message": "Coin has been gifted"
}
```

_Response (401 - Unauthorized)_
```json
{
    "message": "Token invalid"
}
```
_Response (404 - Unauthorized)_
```json
{
    "message":"Not found"
}
```

#Avaliable to specific users
## 1. PATCH '/post/:id'
Update user post

## 2. POST '/users/addPrice'
Admin only command, will create a new price item for coin
headers:

```json
{
  "access_token": "string"
}
```
body:

```json
{
  "coinAmmount": "integer",
   "price": "integer",
}
```
_Response (201 - OK)_

```json
[
    {
        "message": "Price added"
    }
]
```

_Response (401 - Unauthorized)_
```json
{
    "message": "Token invalid"
}
```
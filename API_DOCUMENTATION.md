# Book Store Documentation

## Endpoints :

List of available endpoints:

1. POST /register
2. POST /login
3. GET /books
4. GET /books/:id
5. GET /categories
6. GET /wishlists/
7. POST /wishlists/:BookId
8. DELETE /wishlists/:BookId
9. GET /carts/
10. POST /carts/:BookId
11. DELETE /carts/:BookId
12. GET /shipping/cities
13. POST /shipping/costs
14. POST /pay
15. GET /orders
16. POST /orders

## 1. POST /register

### **Description**

- Register new user

### **Request**

- body

```json
{
  "email": "string",
  "password": "string",
  "username": "string"
}
```

### **Response**

- 201 (Created)

```json
{
  "statusCode": 201,
  "data": {
    "message": "User has been created",
    "newUser": {
      "id": "integer",
      "email": "string"
    }
  }
}
```

- 400 (Bad Request)

```json
{
  "statusCode": 400,
  "error": {
    "message": ["email cannot be empty"]
  }
}
```

OR

```json
{
  "statusCode": 400,
  "error": {
    "message": ["Invalid email format"]
  }
}
```

OR

```json
{
  "statusCode": 400,
  "error": {
    "message": ["email must be unique"]
  }
}
```

OR

```json
{
  "statusCode": 400,
  "error": {
    "message": ["password cannot be empty"]
  }
}
```

## 2. POST /login

### **Description**

- Logged in user to the app

### **Request**

- body

```json
{
  "email": "string",
  "password": "string"
}
```

### **Response**

- 200 (OK)

```json
{
  "statusCode": 200,
  "data": {
    "accessToken": "string",
    "id": "integer",
    "email": "string",
    "username": "string"
  }
}
```

- 400 (Bad Request)

```json
{
  "statusCode": 400,
  "error": {
    "message": "Email and Password is required"
  }
}
```

- 401 (Unauthorized)

```json
{
  "statusCode": 401,
  "error": {
    "message": "Invalid Email / Password"
  }
}
```

## 3. GET /books

### **Description**

- Get all books from database

### **Response**

- 200 (OK)

```json
{
  "statusCode": 200,
  "data":
      {
        "totalItems": "integer",
        "totalPages": "integer",
        "currentPage": "integer",
        "maxItemPerPage": "integer",
        "itemInThisPage": "integer",
        "books": [
          {
            "id": "integer",
            "title": "string",
            "author": "string",
            "categoryId": "integer",
            "price": "integer",
            "stock": "string",
            "imageUrl": "string",
            "createdAt": "date",
            "updatedAt": "date",
            "Category":
              {
                "id": "integer",
                "name": "string",
                "createdAt": "date",
                "updatedAt": "date"
              }
          },
        ...
        ]
      },
}
```

## 4. GET /books/:id

### **Description**

- Get one book from database based on given id

### **Request**

### **Response**

- 200 (OK)

```json
{
  "statusCode": 200,
  "data": {
    "id": "integer",
    "title": "string",
    "author": "string",
    "categoryId": "integer",
    "price": "integer",
    "stock": "string",
    "imageUrl": "string",
    "createdAt": "date",
    "updatedAt": "date",
    "Category": {
      "id": "integer",
      "name": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
}
```

- 400 (Bad Request)

```json
{
  "statusCode": 400,
  "error": {
    "message": "Params must be an integer number"
  }
}
```

- 404 (Not Found)

```json
{
  "statusCode": 404,
  "error": {
    "message": "product with that id cannot be found"
  }
}
```

## 5. GET /categories

### **Description**

- Get all categories from database

### **Response**

- 200 (OK)

```json
{
  "statusCode": 200,
  "data": [
      {
        "id": "integer",
        "name": "string",
        "createdAt": "date",
        "updatedAt": "date",
        "Books": "array",
      },
      ...
  ]
}
```

## 6. GET /wishlists/

### **Description**

- Get all wishlists of current user

### **Request**

- Headers

```json
{
  "Content-Type": "application/x-www-form-urlencoded",
  "access_token": "string"
}
```

### **Response**

- 200 (OK)

```json
{
  "statusCode": 200,
  "data": [
      {
        "id": "integer",
        "UserId": "integer",
        "BookId": "integer",
        "createdAt": "date",
        "updatedAt": "date",
        "Book": {
            "id": "integer",
            "title": "string",
            "author": "string",
            "categoryId": "integer",
            "price": "integer",
            "stock": "string",
            "imageUrl": "string",
            "createdAt": "date",
            "updatedAt": "date",
            "Category": {
            "id": "integer",
            "name": "string",
            "createdAt": "date",
            "updatedAt": "date"
            }
          },
      },
      ...
  ]
}
```

- 401 (Unauthorized)

```json
{
  "statusCode": 401,
  "error": {
    "message": "Access Token is invalid"
  }
}
```

## 7. POST /wishlists/:BookId

### **Description**

- add wishlists to current user based on given BookId

### **Request**

- Headers

```json
{
  "Content-Type": "application/x-www-form-urlencoded",
  "access_token": "string"
}
```

### **Response**

- 200 (OK)

```json
{
  "statusCode": 201,
  "data": {
    "id": "integer",
    "UserId": "integer",
    "BookId": "integer",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

- 401 (Unauthorized)

```json
{
  "statusCode": 401,
  "error": {
    "message": "Access Token is invalid"
  }
}
```

- 404 (Not Found)

```json
{
  "statusCode": 404,
  "error": {
    "message": "product with that id cannot be found"
  }
}
```

## 8. DELETE /wishlists/:BookId

### **Description**

- remove wishlists of current user based on given BookId

### **Request**

- Headers

```json
{
  "Content-Type": "application/x-www-form-urlencoded",
  "access_token": "string"
}
```

### **Response**

- 200 (OK)

```json
{
  "statusCode": 201,
  "message": "successfully remove product from your wishlists"
}
```

- 401 (Unauthorized)

```json
{
  "statusCode": 401,
  "error": {
    "message": "Access Token is invalid"
  }
}
```

- 404 (Not Found)

```json
{
  "statusCode": 404,
  "error": {
    "message": "product with that id cannot be found"
  }
}
```

## 9. GET /carts/

### **Description**

- Get all books in cart of current user

### **Request**

- Headers

```json
{
  "Content-Type": "application/x-www-form-urlencoded",
  "access_token": "string"
}
```

### **Response**

- 200 (OK)

```json
{
  "statusCode": 200,
  "data": [
      {
        "id": "integer",
        "UserId": "integer",
        "BookId": "integer",
        "createdAt": "date",
        "updatedAt": "date",
        "Book": {
            "id": "integer",
            "title": "string",
            "author": "string",
            "categoryId": "integer",
            "price": "integer",
            "stock": "string",
            "imageUrl": "string",
            "createdAt": "date",
            "updatedAt": "date",
            "Category": {
            "id": "integer",
            "name": "string",
            "createdAt": "date",
            "updatedAt": "date"
            }
          },
      },
      ...
  ]
}
```

- 401 (Unauthorized)

```json
{
  "statusCode": 401,
  "error": {
    "message": "Access Token is invalid"
  }
}
```

## 10. POST /carts/:BookId

### **Description**

- add book to current user cart based on given BookId

### **Request**

- Headers

```json
{
  "Content-Type": "application/x-www-form-urlencoded",
  "access_token": "string"
}
```

### **Response**

- 200 (OK)

```json
{
  "statusCode": 201,
  "data": {
    "id": "integer",
    "UserId": "integer",
    "BookId": "integer",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

- 401 (Unauthorized)

```json
{
  "statusCode": 401,
  "error": {
    "message": "Access Token is invalid"
  }
}
```

- 404 (Not Found)

```json
{
  "statusCode": 404,
  "error": {
    "message": "product with that id cannot be found"
  }
}
```

## 11. DELETE /carts/:BookId

### **Description**

- remove books from current user cart based on given BookId

### **Request**

- Headers

```json
{
  "Content-Type": "application/x-www-form-urlencoded",
  "access_token": "string"
}
```

### **Response**

- 200 (OK)

```json
{
  "statusCode": 201,
  "message": "successfully remove product from your cart"
}
```

- 401 (Unauthorized)

```json
{
  "statusCode": 401,
  "error": {
    "message": "Access Token is invalid"
  }
}
```

- 404 (Not Found)

```json
{
  "statusCode": 404,
  "error": {
    "message": "product with that id cannot be found"
  }
}
```

## 12. GET /shipping/cities

### **Description**

- Get all available cities

### **Request**

- Headers

```json
{
  "Content-Type": "application/x-www-form-urlencoded",
  "access_token": "string",
  "key": "string"
}
```

### **Response**

- 200 (OK)

```json
{
  "statusCode": 200,
  "data": [
    {
      "city_id": "integer",
      "province_id": "integer",
      "province": "string",
      "type": "string",
      "city_name": "string",
      "postal_code": "string"
    },
     ...
  ],

}
```

- 401 (Unauthorized)

```json
{
  "statusCode": 401,
  "error": {
    "message": "Access Token is invalid"
  }
}
```

## 13. POST /shipping/costs

### **Description**

- gain cost data for shipping

### **Request**

- Headers

```json
{
  "Content-Type": "application/x-www-form-urlencoded",
  "access_token": "string",
  "key": "string"
}
```

- Body

```json
{
  "origin": "integer",
  "destination": "integer",
  "weight": "integer",
  "courier": "string"
}
```

### **Response**

- 200 (OK)

```json
{
  "statusCode": 201,
  "data": {
    "origin": {
      "city_id": "integer",
      "province_id": "integer",
      "province": "string",
      "type": "string",
      "city_name": "string",
      "postal_code": "string"
    },
    "destination": {
      "city_id": "integer",
      "province_id": "integer",
      "province": "string",
      "type": "string",
      "city_name": "string",
      "postal_code": "string"
    },
    "shipping": [
      {
        "service": "string",
        "description": "string",
        "cost": [
          {
            "value": "integer",
            "etd": "string",
            "note": "string"
          }
        ]
      }
    ],
    ...
  }
}
```

- 401 (Unauthorized)

```json
{
  "statusCode": 401,
  "error": {
    "message": "Access Token is invalid"
  }
}
```

## 14. POST /pay

### **Description**

- create a payment

### **Request**

- Headers

```json
{
  "Content-Type": "application/x-www-form-urlencoded",
  "access_token": "string",
  "key": "string"
}
```

- Body

```json
{
  "price": "integer"
}
```

### **Response**

- 200 (OK)

```json
{
  "statusCode": 201,
  "token": "integer"
}
```

- 401 (Unauthorized)

```json
{
  "statusCode": 401,
  "error": {
    "message": "Access Token is invalid"
  }
}
```

## 15. GET /orders

### **Description**

- Get all order history of current user

### **Request**

- Headers

```json
{
  "Content-Type": "application/x-www-form-urlencoded",
  "access_token": "string"
}
```

### **Response**

- 200 (OK)

```json
{
  "statusCode": 200,
  "data": [
    {
        "id": "integer",
        "UserId": "integer",
        "books": "array",
        "price": "integer",
        "status": "string",
        "receivedDateMin": "date",
        "receivedDateMax": "date",
        "updatedAt": "date",
        "updatedAt": "date",
        "booksDetail": "array",
    }
    ...
  ],
}
```

- 401 (Unauthorized)

```json
{
  "statusCode": 401,
  "error": {
    "message": "Access Token is invalid"
  }
}
```

## 16. POST /orders

### **Description**

- create a new order

### **Request**

- Headers

```json
{
  "Content-Type": "application/x-www-form-urlencoded",
  "access_token": "string"
}
```

- Body

```json
{
  "books": "array",
  "price": "integer",
  "receivedDateMin": "date",
  "receivedDateMax": "date"
}
```

### **Response**

- 200 (OK)

```json
{
  "statusCode": 201,
  "message": "Order Success!"
}
```

- 401 (Unauthorized)

```json
{
  "statusCode": 401,
  "error": {
    "message": "Access Token is invalid"
  }
}
```

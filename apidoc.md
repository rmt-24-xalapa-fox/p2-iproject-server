# API Documentation

## Endpoints :

List of available endpoints:

- `GET /`
- `GET /product/:ProductId`
- `POST /register`
- `POST /login`
- `GET /user/wishlist`
- `POST /user/wishlist`
- `DELETE /user/wishlist/:ProductId`
- `GET /user/cart`
- `POST /user/cart`
- `DELETE /user/cart`

## 1. GET /foods

### Response

- _200 - OK_
  ```json
  {
      "statusCode": 200,
      "data": [
                {
                "currentPage": integer,
                "totalPages": integer,
                "data": [
                  {
                    "id": integer,
                    "brand": string,
                    "name": string,
                    "price": integer,
                    "price_sign": string,
                    "currency": string,
                    "image_link": string,
                    "product_link": string,
                    "website_link": string,
                    "description": text,
                    "rating": integer,
                    "category": string,
                    "product_type": string,
                    "tag_list": [
                      string,
                      string
                    ],
                    "created_at": date,
                    "updated_at": date,
                    "product_api_url": string,
                    "api_featured_image": string,
                    "product_colors": [
                      {
                        "hex_value": string,
                        "colour_name": string
                      },
                    ]
                  },
                ]
          },
      ]
  }
  ```
- _500 - ISE_
  ```json
  {
    "statusCode": 500,
    "error": {
      "message": "Internal Server Error"
    }
  }
  ```

## 2. GET /product/:ProductId

### Request

- Params
  ```json
  {
      "ProductId": Integer
  }
  ```

### Response

- _200 - OK_
  ```json
  {
  "statusCode": 200,
  "data": {
                    "id": integer,
                    "brand": string,
                    "name": string,
                    "price": integer,
                    "price_sign": string,
                    "currency": string,
                    "image_link": string,
                    "product_link": string,
                    "website_link": string,
                    "description": text,
                    "rating": integer,
                    "category": string,
                    "product_type": string,
                    "tag_list": [
                      string,
                      string
                    ],
                    "created_at": date,
                    "updated_at": date,
                    "product_api_url": string,
                    "api_featured_image": string,
                    "product_colors": [
                      {
                        "hex_value": string,
                        "colour_name": string
                      },
                    ]
                  },
  }
  ```
- _404 - NOT FOUND_
  ```json
  {
    "statusCode": 404,
    "message": "Error Not Found"
  }
  ```

## 3. POST /register

### Request

- Body
  ```json
  {
      "username": String,
      "email": String,
      "password": String,
  }
  ```

### Response

- _201 - CREATED_

  ```json
  {
  "statusCode": 201,
  "data": {
      "message": "User has been created",
      "newUser": {
          "id": Integer,
          "email": String
      }
  }
  }
  ```

- _400 - BAD REQUEST_
  ```json
  {
    "statusCode": 400,
    "message": "Password should have at least 5 characters"
  }
  ```
  OR
  ```json
  {
    "statusCode": 400,
    "message": "Email is required"
  }
  ```
  OR
  ```json
  {
    "statusCode": 400,
    "message": "Email should be in an email format"
  }
  ```
  OR
  ```json
  {
    "statusCode": 400,
    "message": "Password is required"
  }
  ```

## 4. POST /login

### Request

- Body
  ```json
  {
      "email": String,
      "password": String
  }
  ```

### Response

- _200 - OK_

  ```json
  {
  "statusCode": 200,
  "data": {
      "access_token": String,
  }
  }
  ```

- _401 - UNAUTHORIZED_
  ```json
  {
    "statusCode": 401,
    "message": "Invalid Email and Password"
  }
  ```

## 5. GET /user/wishlist

### Request

- Params
  ```json
  {
      "FoodId": Integer
  }
  ```
- Headers
  ```json
  {
      "access_token": String
  }
  ```

### Response

- _200 - OK_
  ```json
  {
  "statusCode": 200,
  "data": [
                  {
                    "id": integer,
                    "brand": string,
                    "name": string,
                    "price": integer,
                    "price_sign": string,
                    "currency": string,
                    "image_link": string,
                    "product_link": string,
                    "website_link": string,
                    "description": text,
                    "rating": integer,
                    "category": string,
                    "product_type": string,
                    "tag_list": [
                      string,
                      string
                    ],
                    "created_at": date,
                    "updated_at": date,
                    "product_api_url": string,
                    "api_featured_image": string,
                    "product_colors": [
                      {
                        "hex_value": string,
                        "colour_name": string
                      },
                    ]
                  },
    ]
  }
  ```
- _401 - UNAUTHORIZED_
  ```json
  {
    "statusCode": 401,
    "message": "You have to login first"
  }
  ```


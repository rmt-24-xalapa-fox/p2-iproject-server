## Endpoints

List of Available Endpoints:

Products
- `POST /products`
- `GET /products`
- `GET /products/:id`
- `PUT /products/:id`
- `DELETE /products/:id`

Categories
- `POST /categories`
- `GET /categories`
- `GET /categories/:id`
- `PUT /categories/:id`

Ingredients
- `POST /ingredients`
- `GET /ingredients`
- `GET /ingredients/:id`
- `PUT /ingredients/:id`
- `DELETE /ingredients/:id`

Recipes
- `POST /recipes`
- `GET /recipes`
- `GET /recipes/:id`
- `PUT /recipes/:id`
- `DELETE /recipes/:id`

Sales
- `POST /sales`
- `GET /sales`
- `GET /sales/:id`
- `PUT /sales/:id`
- `DELETE /sales/:id`

### POST /products

#### Description

- Create a new product

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "name": String,
    "description": String,
    "imgUrl": String,
    "price": Integer,
    "CategoryId": Integer
  }
  ```

#### Response

_201 - Created_

- Body

  ```json
  {
    "id": Integer,
    "name": String,
    "description": String,
    "imgUrl": String,
    "price": Integer,
    "CategoryId": Integer,
    "updatedAt": Date,
    "createdAt": Date,
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "error": {
      "message": String
    }
  }
  ```

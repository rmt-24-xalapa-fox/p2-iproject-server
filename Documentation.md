## Endpoints

List of Available Endpoints:

Products
- `POST /products`
- `GET /products`
- `GET /products/:id`
- `PUT /products/:id`
- `DELETE /products/:id`

Categories
- `GET /categories` 

Sales
- `POST /sales` 
- `GET /sales` 

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

### GET /products

#### Description

- Fetch all product data

#### Response

_200 - OK_

- Body
  ```json
    [
      {
        "id": Integer,
        "name": String,
        "description": String,
        "imgUrl": String,
        "price": Integer,
        "CategoryId": Integer,
        "Category": {
            "name": String
        }
      },
      ...
    ]
  
  ```

### GET /products:id

#### Description

- Fetch one product based on a given id

#### Response

_200 - OK_

- Body
  ```json
    [
      {
        "id": Integer,
        "name": String,
        "description": String,
        "imgUrl": String,
        "price": Integer,
        "CategoryId": Integer,
        "Category": {
            "name": String
        }
      },
    ]
  
  ```

_404 - Error not found_

- Body
  ```json
  {
    "statusCode": 404,
    "error": {
        "message": "Error not found"
    }  
  }
  ```

### PUT /products/:id

- Edit products data based on given id

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

_200 - Ok_

- Body
  ```json

  {
      "message": String
  }

  ```

_404 - Error not found_

- Body
  ```json
  {
    "statusCode": 404,
    "error": {
        "message": "Error not found"
    }  
  }
  ```

### DELETE /products/:id

- Remove a product data based on given id

#### Response

_201 - Created_

- Body
  ```json

  {
      "message": String
  }

  ```

_404 - Error not found_

- Body
  ```json
  {
    "statusCode": 404,
    "error": {
        "message": "Error not found"
    }  
  }
  ```

### GET /categories

#### Description

- Fetch all available categories

#### Response

_200 - OK_

- Body
  ```json

    [
      {
        "id": Integer,
        "name": String,
      },
      ...
    ]
  
  ```

### POST /sales

#### Description

- Create a new sales

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
    "quantity": Integer,
    "sales": Integer,
    "cost": Integer,
    "ProductId": Integer
  }
  ```

#### Response

_201 - Created_

```json
{
    "id": Integer,
    "quantity": Integer,
    "sales": Integer,
    "cost": Integer,
    "ProductId": Integer,
    "updatedAt": Date,
    "createdAt": Date
}
```

### GET /sales

#### Description

- Fetch all sales data

#### Response

_200 - OK_

- Body
  ```json
    [
      {
        "quantity": Integer,
        "sales": Integer,
        "cost": Integer,
        "createdAt": Date,
        "Product": {
            "name": String
        }
      },
      ...
    ]
  
  ```
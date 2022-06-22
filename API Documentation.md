## Endpoints

List of Available Endpoints:
- `POST /register`
- `POST /login`
- ``



### POST /register

#### Description

- Create a new User

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
         "username": STRING,
         "email": STRING,
         "password": STRING,
         "phoneNumber": STRING,
         "address": STRING,
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
  "statusCode": 201,
    "message": STRING,

  }
  ```

_400 - Validation Error_

- Body

  ```json
  {
    "statusCode": 400,
    "error": {
      "message": String
    }
  }
  ```

### POST /login

#### Description

- login to page and get token

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
         "username": STRING,
         "password": STRING,
      
  }
  ```

#### Response

_200 - Login-Success_

- Body
  ```json
  {
  "statusCode": 200,
    "message": STRING,
    "token" : STRING,
    "userId": INTEGER,
    "username": STRING,
    "role": STRING

  }
  ```

_401 - Invalid username/password_

- Body

  ```json
  {
    "statusCode": 401,
    "error": {
      "message": String
    }
  }
  ```





### GET /getAnime

#### Description

- get all anime

### Request

- Headers

  ```json
  {
    "access_token": STRING

  }
  ```

#### Params 
-Query
  ```json
  {
    "name": String,
    "size": Integer,
    "page": Integer,
  }
  ```

#### Response

_200 - Success get all anime

- Body
  ```json
  {
  "statusCode": 200,
  "Anime": Array of Anime,
  "TotalPage": Integer,
  "currentPage": Integer

  }
  ```
    _401 - Access Token is Invalid_

   -need login to access



- Body
  ```json
  {
    "statusCode": 401,
    "error": {
      "message": String
    }
  }
  ```


### GET /seasonAnime

#### Description

- get all season Anime

### Request

- Headers

  ```json
  {
    "access_token": STRING

  }
  ```
#### Response

_200 - Success get all anime season now

- Body
  ```json
  {
  "statusCode": 200,
  "Anime": Array of Anime,
  }
  ```
  _401 - Access Token is Invalid_

   -need login to access



- Body
  ```json
  {
    "statusCode": 401,
    "error": {
      "message": String
    }
  }
  ```


### GET /favorites

#### Description

- get all favorite for Anime

### Request

- Headers

  ```json
  {
    "access_token": STRING

  }
  ```

#### Response

_200 - Success get all favorite_

- Body
  ```json
  {
  "statusCode": 200,
  "Favorite": Array of Favorite

  }
  ```

  _401 - Access Token is Invalid_

   -need login to access



- Body
  ```json
  {
    "statusCode": 401,
    "error": {
      "message": String
    }
  }
  ```

### POST /addFavorite

#### Description

- add favorite Anime

### Request

- Headers

  ```json
  {
    "access_token": STRING

  }
  ```

#### Response

_201 - Success get add favorite_

- Body
  ```json
  {
  "statusCode": 201,
  "message": String
  }
  ```

  _401 - Access Token is Invalid_

   -need login to access



- Body
  ```json
  {
    "statusCode": 401,
    "error": {
      "message": String
    }
  }
  ```



### PATCH /favorites/:id'

#### Description

- update currentepisode favorite Anime

### Request

- Headers

  ```json
  {
    "access_token": STRING

  }
  ```

#### Response

_200 - Success update currentepisode favorite_

- Body
  ```json
  {
  "statusCode": 200,
  "message": String
  }
  ```

  _401 - Access Token is Invalid_

   -need login to access



- Body
  ```json
  {
    "statusCode": 401,
    "error": {
      "message": String
    }
  }
  ```




### DELETE /favorites/:id'

#### Description

- delete favorite Anime

### Request

- Headers

  ```json
  {
    "access_token": STRING

  }
  ```

#### Response

_200 - Success delete favorite_

- Body
  ```json
  {
  "statusCode": 200,
  "message": String
  }
  ```

  _401 - Access Token is Invalid_

   -need login to access



- Body
  ```json
  {
    "statusCode": 401,
    "error": {
      "message": String
    }
  }
  ```






### Global Error

#### Response


 _401 - Access Token is Invalid_

  -need login to access


- Body

  ```json
  {
    "statusCode": 401,
    "error": {
      "message": String
    }
  }
  ```

  _403 - Forbidden_

  - need authorization

- Body

  ```json
  {
    "statusCode": 403,
    "error": {
      "message": String
    }
  }
  ```

  _404 - Not Found_

- Body
  ```json
  {
    "statusCode": 404,
    "error": {
      "message": "Error not found"
    }
  }
  ```

_500 - Internal Server Error_

- Body
  ```json
  {
    "statusCode": 500,
    "error": {
      "message": "Internal Server Error"
    }
  }
  ```
## Endpoints

List of Available Endpoints:

- `POST /register`
- `POST /login`

- `GET /digimonList`

- `PUT /user/gachaDigimon`
- `GET /user/gachaCoin`
- `GET /user/myDigimon`
- `GET /user/referralCode`
- `PUT /user/sellDigimon/:myDigimonId`

### POST /signup

#### Description

- Create new User

#### Request

- Body

  ```json
  {
    "username": String,
    "email": String,
    "password": String,
  }
  ```

  - Query

  ```json
  {
    "referral": Integer,
  }
  ```

#### Response

_201 - Created_

- Body

  ```json
  {
    "email": String,
    "username": String,
    "role": String
  }
  ```

_400 - Bad Request_

- Body

  ```json
    {
      "message": "Email is required",
    }
    OR
    {
      "message": "Password is required",
    }
    OR
    {
      "message": "Username is required",
    }
    OR
    {
      "message": "Invalid email format"
    }
  ```

### POST /login

#### Description

- Login User

#### Request

- Body

  ```json
  {
    "email": String,
    "password": String,
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "access_token": String
  }
  ```

_401 - Unauthorized_

- Body

  ```json
  {
    "message": "Invalid email/password"
  }
  ```

### GET /digimonList

#### Description

- Get digimon list for home

#### Response

_200 - OK_

- Body

  ```json
  {
    "dataDigimonFresh": [
        {
            "name": String,
            "img": String,
            "level": String,
        },
        ...
    ],
    "dataDigimonInTraining":  [
        {
             "name": String,
            "img": String,
            "level": String,
        },
        ...
    ],
    "dataDigimonRookie": [
        {
            "name": String,
            "img": String,
            "level": String,
        },
        ...
    ]
  }
  ```

### PUT /user/gachaDigimon

#### Description

- Gacha Digimon

#### Request

- Headers

  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded",
    "access_token": String
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "message": "You got a dupe ! Better luck next time !",
    "name": String,
    "img": String,
    "level": String
  }
  ```

_201 - Created_

- Body

  ```json
  {
    "message": "You got a new Digimon !",
    "name": String,
    "img": String,
    "level": String
  }
  ```

_404 - Bad Request_

- Body

  ```json
  {
    "message": "You dont have enough coins !"
  }
  ```

### GET /user/gachaCoin

#### Description

- Get user gachaCoin

#### Request

- Headers

  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded",
    "access_token": String
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "gachaCoin": 8450
  }
  ```

### GET /user/myDigimon

#### Description

- Get user gachaCoin

#### Request

- Headers

  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded",
    "access_token": String
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
    [
        {
            "id": Integer,
            "UserId": Integer,
            "name": String,
            "img": String,
            "level": String,
            "createdAt": Date,
            "updatedAt": Date
        },
        ...
    ]
  ```

### GET /user/referralCode

#### Description

- Get user referral code info

#### Request

- Headers

  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded",
    "access_token": String
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
    {
        "referralLink": String,
        "qrCode": String
    }
  ```

### GET /user/sellDigimon/:myDigimonId

#### Description

- Sell unwanted digimon

#### Request

- Headers

  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded",
    "access_token": String
  }
  ```

- Params

  ```json

  {
      "myDigimonId": Integer
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "message": "Digimon has been sold ! You got 50 Coin !"
  }
  ```

_404 - Not Found_

- Body

  ```json
  {
    "name": "NotFound"
  }
  ```

### Global Error

#### Response

_500 - Internal Server Error_

- Body

  ```json
  {
    "statusCode": "Failed",
    "error": 500,
    "message": "Internal Server Error"
  }
  ```

_401 - Access Token Invalid_

- Body

  ```json
  {
    "status": "Failed",
    "code": 401,
    "message": "Access Token Invalid"
  }
  ```

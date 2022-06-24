## Endpoints

List of Available Endpoints:

- `POST /register`
- `POST /login`
- `GET /heroes`
- `GET /items`
- `GET /builds`
- `POST /builds`
- `PATCH /builds/:id`
- `GET /api/heroes`
- `GET /api/roles`
- `GET /api/heroes/:id`
- `GET /api/roles/:role`

### POST /register

#### Description

- Register USER

#### Response

_201 - Created_

- Body
  ```json
  {
    "statusCode": 201,
    "data": {
      "id": 12,
      "email": "coba7@mail.com",
      "password": "$2a$08$7Y/gYR7UuUDyk0woB5lt0OJCb0gXt3xBmOIOtdA3MdgiuZ8a9F9L.",
      "updatedAt": "2022-06-23T03:13:07.474Z",
      "createdAt": "2022-06-23T03:13:07.474Z"
    }
  }
  ```

### POST /login

#### Description

- Login USER

#### Response

_200 - Ok_

- Body
  ```json
  {
    "statusCode": 200,
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImVtYWlsIjoiY29iYTdAbWFpbC5jb20iLCJpYXQiOjE2NTU5NTQwNTh9.P3JKd-7q-ANsnyigWP7oCbOwbG5X9MBIm2_9Auz8Yv0",
    "id": 12,
    "email": "coba7@mail.com"
  }
  ```

### GET /heroes

#### Description

- Get all the Heroes data

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": 200,
    "heroList": [
      {
        "id": 1,
        "name": "Xavier",
        "key": "//akmweb.youngjoygame.com/web/madmin/image/3773d63a9d3f37b16106ad6eb7d32a39.png?w=150-150-fffffe",
        "createdAt": "2022-06-21T15:36:48.278Z",
        "updatedAt": "2022-06-21T15:36:48.278Z"
      }
    ]
  }
  ```

### GET /items

#### Description

- Get all the Items data

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": 200,
    "itemList": [
      {
        "id": 1,
        "name": "Active Conceal",
        "imgUrl": "https://zathong.com/wp-content/uploads/2021/06/Active-Conceal-e1640587002994.png",
        "createdAt": "2022-06-21T15:36:48.304Z",
        "updatedAt": "2022-06-21T15:36:48.304Z"
      }
    ]
  }
  ```

### GET /builds

#### Description

- Get all the Builds data

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": 200,
    "buildList": [
      {
        "id": 1,
        "UserId": 1,
        "HeroId": 1,
        "Item1Id": 2,
        "Item2Id": 12,
        "Item3Id": 25,
        "Item4Id": 28,
        "Item5Id": 30,
        "Item6Id": 35,
        "Item7Id": 41,
        "vote": 0,
        "createdAt": "2022-06-21T16:40:29.646Z",
        "updatedAt": "2022-06-21T16:40:29.646Z",
        "User": {
          "id": 1,
          "email": "aku@mail.com",
          "createdAt": "2022-06-21T16:05:13.487Z",
          "updatedAt": "2022-06-21T16:05:13.487Z"
        },
        "Hero": {
          "id": 1,
          "name": "Xavier",
          "key": "//akmweb.youngjoygame.com/web/madmin/image/3773d63a9d3f37b16106ad6eb7d32a39.png?w=150-150-fffffe",
          "createdAt": "2022-06-21T15:36:48.278Z",
          "updatedAt": "2022-06-21T15:36:48.278Z"
        },
        "item1": {
          "id": 2,
          "name": "Passive Dire Hit",
          "imgUrl": "https://zathong.com/wp-content/uploads/2021/06/Passive_Dire_Hit-e1640587019240.png",
          "createdAt": "2022-06-21T15:36:48.304Z",
          "updatedAt": "2022-06-21T15:36:48.304Z"
        },
        "item2": {
          "id": 12,
          "name": "Magic Shoes",
          "imgUrl": "https://zathong.com/wp-content/uploads/2021/06/Magic_Shoes-e1622949082913.png",
          "createdAt": "2022-06-21T15:36:48.304Z",
          "updatedAt": "2022-06-21T15:36:48.304Z"
        },
        "item3": {
          "id": 25,
          "name": "Necklace of Durance",
          "imgUrl": "https://zathong.com/wp-content/uploads/2021/06/Necklace_of_Durance-e1622949055978.png",
          "createdAt": "2022-06-21T15:36:48.304Z",
          "updatedAt": "2022-06-21T15:36:48.304Z"
        },
        "item4": {
          "id": 28,
          "name": "Ice Queen Wand",
          "imgUrl": "https://zathong.com/wp-content/uploads/2021/06/Ice_Queen_Wand-e1622949136252.png",
          "createdAt": "2022-06-21T15:36:48.304Z",
          "updatedAt": "2022-06-21T15:36:48.304Z"
        },
        "item5": {
          "id": 30,
          "name": "Holy Crystal",
          "imgUrl": "https://zathong.com/wp-content/uploads/2021/06/Holy_Crystal-e1622949169695.png",
          "createdAt": "2022-06-21T15:36:48.304Z",
          "updatedAt": "2022-06-21T15:36:48.304Z"
        },
        "item6": {
          "id": 35,
          "name": "Genius Wand",
          "imgUrl": "https://zathong.com/wp-content/uploads/2021/06/Genius_Wand-e1622949598139.png",
          "createdAt": "2022-06-21T15:36:48.304Z",
          "updatedAt": "2022-06-21T15:36:48.304Z"
        },
        "item7": {
          "id": 41,
          "name": "Divine Glaive",
          "imgUrl": "https://zathong.com/wp-content/uploads/2021/06/Divine_Glaive-e1622949662735.png",
          "createdAt": "2022-06-21T15:36:48.304Z",
          "updatedAt": "2022-06-21T15:36:48.304Z"
        }
      }
    ]
  }
  ```

### POST /Builds

#### Description

- Create a new Builds data

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
    "HeroId": 10,
    "Item1Id": 2,
    "Item2Id": 21,
    "Item3Id": 25,
    "Item4Id": 28,
    "Item5Id": 33,
    "Item6Id": 35,
    "Item7Id": 14
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "statusCode": 201,
    "builds": {
      "vote": 0,
      "id": 3,
      "UserId": 1,
      "HeroId": 10,
      "Item1Id": 2,
      "Item2Id": 21,
      "Item3Id": 25,
      "Item4Id": 28,
      "Item5Id": 33,
      "Item6Id": 35,
      "Item7Id": 14,
      "updatedAt": "2022-06-23T03:20:52.671Z",
      "createdAt": "2022-06-23T03:20:52.671Z"
    }
  }
  ```

_400 - All column must be filled_

- Body
  ```json
  {
    "statusCode": 400,
    "error": {
      "message": "All is required"
    }
  }
  ```

### PATCH /builds/:id

#### Description

- Update vote based on given id

#### Response

_200 - OK_

- Body

  ```json
  {
    "message": "Update Vote Success",
    "updateVote": [1]
  }
  ```

### GET /api/heroes

#### Description

- Get all the Api Heroes data

#### Response

_200 - OK_

- Body
  ```json
  {
    "response": {
      "code": 2000,
      "message": "SUCCESS",
      "data": [
        {
          "name": "Xavier",
          "heroid": "115",
          "key": "//akmweb.youngjoygame.com/web/madmin/image/3773d63a9d3f37b16106ad6eb7d32a39.png?w=150-150-fffffe"
        }
      ]
    }
  }
  ```

### GET /api/roles

#### Description

- Get all the Api Roles data

#### Response

_200 - OK_

- Body
  ```json
  {
    "response": [
      {
        "id": 1,
        "label": "Tank"
      },
      {
        "id": 2,
        "label": "Fighter"
      },
      {
        "id": 3,
        "label": "Assassin"
      },
      {
        "id": 4,
        "label": "Mage"
      },
      {
        "id": 5,
        "label": "Marksman"
      },
      {
        "id": 6,
        "label": "Support"
      }
    ]
  }
  ```

### GET /api/heroes/:id

#### Description

- Get all the Api Heroes Detail data

#### Response

_200 - OK_

- Body
  ```json
  {
    "response": {
      "code": 2000,
      "message": "SUCCESS",
      "data": {
        "cover_picture": "https://img.mobilelegends.com/group1/M00/00/07/rB_-LVpDtCaAe1FhAABuf7v7jsA9554466",
        "gallery_picture": "https://img.mobilelegends.com/group1/M00/00/07/rB_-LVpDtCqAIMqVAAAkrvMbLto1823176",
        "junling": "",
        "cost": "",
        "des": "",
        "mag": "52",
        "phy": "58",
        "alive": "85",
        "diff": "40",
        "name": "Hilda",
        "type": "Fighter",
        "skill": {}
      }
    }
  }
  ```

### GET /api/roles/:role

#### Description

- Get all the Api Heroes by Roles data

#### Response

_200 - OK_

- Body
  ```json
  {
    "response": {
      "code": 2000,
      "message": "SUCCESS",
      "data": [
        {
          "name": "Edith",
          "heroid": "111",
          "key": "//akmweb.youngjoygame.com/web/madmin/image/04d1a3a5e49f6a68604bab57ca96ab5c.png?w=150-150-312b1f"
        }
      ]
    }
  }
  ```

### Global Error

#### Response

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

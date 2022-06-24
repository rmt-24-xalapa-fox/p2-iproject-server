# Endpoints

- POST `/register`

- POST `/login`

- GET ` /event`

- POST `/event`

- PUT `/event/:id`

- GET `/myevent`

- POST `/myevent/:id`

- DELETE `/myevent/:id`

## 1. POST `/register` - register

### RESPONSE

input:
email,password,name,phoneNumber

Status Code : `200` (OK)

Body:

    {
        "statusCode": 201,
        ""data": {
            "id" ,
            "name" ,
            "email",
            "phoneNumber"
        }
    }

Status Code : `400` (Bad Request)

Body:

    {
    "name": "SequelizeUniqueConstraintError",
    "message": "email must be unique"

}

## 2. POST `/login` - login

input: email,password

### RESPONSE

Status Code : `200` (OK)

Body:

{
"statusCode": 200,
"data": {
"access_token"
"userId",
"email"
}
}

Status Code : `401` (Unathorized)

Body:

{
"name": "UserNotFound",
"message": "Wrong Username / Password"
}

## 3. GET `/event` - Get events

input : req.params.id

Status Code : `200` (OK)

Body:

    {
        "statusCode": 200,
        "data": {
            "id": 7,
            "name": "asdasda",
            "type": "asdasdasd",
            "status": "active",
            "location": "asdasdasd",
            "latitude": null,
            "longitude": null,
            "date": "2022-06-06T00:00:00.000Z",
            "time": "17:17",
            "description": "adasdaksasdj",
            "imgUrl": "https://i.pinimg.com/originals/fe/3f/ab/fe3fab92dbfd79bee3f021963854dc4b.png",
            "author": "jonathanadrino@gmail.com",
            "createdAt": "2022-06-24T04:12:56.872Z",
            "updatedAt": "2022-06-24T04:12:56.872Z"
        },
    }

## 4. POST `/event` - Post event

input headers : access_token

input body:
- name (String)
- type (String)
- time (String)
- imgUrl (String)
- location (String)
- description (String)
- date (date)

Status Code : `201` (created)

    {
       "message": "Event added",
       "data": {
        "id": 8,
        "name": "test",
        "type": "concert",
        "status": "active",
        "location": "mana aja",
        "date": "2022-06-27T00:00:00.000Z",
        "time": "15:00",
        "description": "lorem ipsum",
        "imgUrl": "www.google.com",
        "author": "jonathanadrino@gmail.com",
        "updatedAt": "2022-06-24T04:28:59.443Z",
        "createdAt": "2022-06-24T04:28:59.443Z",
        "latitude": null,
        "longitude": null
    }
    }


## 5. PUT `/event/:id` - Update Event

Status Code : `200` (OK)

   {
    "message": "Event test updated",
    "subscribers": []
}

Status Code : `403` (Forbidden)

{
    "name": "Forbidden",
    "message": "You do not have access"
}

Status Code : `403` (Forbidden)

{
    "name": "eventNotFound",
    "message": "Food not found"
}


## 5. GET `/myevent/` - GET my event

input:access_token

statusCode 200 (OK)

{
    "statusCode": 200,
    "data": [
        {
            "id": ,
            "name": "",
            "type": "",
            "status": "",
            "location": "",
            "latitude": "",
            "longitude": "",
            "date": "",
            "time": "",
            "description": "",
            "imgUrl": "",
            "author": "",
            "createdAt": "",
            "updatedAt": ""
        },
    ]
}


## 5. POST`/myevent/:id` - Post my event
input: access, event id

statusCode 201(created)

{
    "message": "Event <name> added to my event",
    "data": {
        "id"
        "UserId"
        "EventId"
        "updatedAt",
        "createdAt"
    }
}

statusCode 401 (Unathorized)

{
    "name": "InvalidToken",
    "message": "Access token invalid"
}

## 5. DELETE `/myevent/:id` - DELETE my event

input: event id, access_token

statusCode 200 (OK)
{
    "message": "Event Stark-Mraz removed from my event"
}

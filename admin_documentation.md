# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /public/register`
- `POST /public/login`
- `PATCH /public/:id`
- `PUT /public/:id`
&nbsp;

## 1. POST /register

Description:
- Create a new customer account 

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
}
```

_Response (201 - Created)_

```json
{
    "statusCode": 200,
    "message": {
        "id": 3,
        "email": "admin@email.com",
        "password": "$2a$08$VETytdVnLL7cU9l7qBVs8eVjxm6fhV1UgW3i..LS7.SbJ.NjrfNsK",
        "role": "admin",
        "updatedAt": "2022-06-22T15:22:48.531Z",
        "createdAt": "2022-06-22T15:22:48.531Z",
        "phoneNumber": null
    }
}
```

_Response (400 - Bad Request)_ //to be updated//

```json
{
    "statusCode": 400,
    "error": {
        "message": "Email already taken"
    }
}
OR
{
    "statusCode": 400,
    "error": {
        "message": "Email must be in Email format\n"
    }
}
OR
{
    "statusCode": 400,
    "error": {
        "message": "Email cannot be empty\nEmail must be in Email format\n"
    }
}
OR
{
    "statusCode": 400,
    "error": {
        "message": "Password cannot be empty\n"
    }
}
```


&nbsp;

## 2. POST /login

Description:
- Get all news from database

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
}
```

_Response (200 - OK)_

```json
{
    "statusCode": 200,
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjU1NDg1OTE5LCJleHAiOjE2NTU0ODk1MTl9.AUQ9GIV_nIst3KOG1-umVzaOf-ivZFFk_hrj57dvKn4",
        "authorId": 3,
        "displayEmail": "admin@email.com",
        "displayRole": "admin"
    }
}
```

_Response (401 - Unaothorized)_ 

```json
{
    "statusCode": 401,
    "error": {
        "message": "Error user not found or password not matched"
    }
}
```

## 3. PATCH /public/:id

Description:
- Change status of a specific report 

Request:

- headers:

```json
{
  "access_token" : "string",
}
```
- body:

```json
{
  "status": "string",
}
```

_Response (200 - Success)_

```json
{
    "statusCode": 200,
    "message": "Success update Report status from Rejected into Rejected",
    "data": [
        {
            "id": 6,
            "imageUrl": "https://www.researchgate.net/profile/Sushma-Srinivas/publication/257632644/figure/fig15/AS:392608498110472@1470616568575/Damaged-road-due-to-Christchurch-earthquake-Photo.png",
            "description": "mobil saya nyungsep pas mau masuk ke coffee shop, hadeh...",
            "latitude": "-6.278631",
            "longitude": "106.832143",
            "UploaderId": 1,
            "status": "Rejected",
            "respMessage": "No message from Administrator yet",
            "createdAt": "2022-06-22T15:12:05.352Z",
            "updatedAt": "2022-06-23T02:17:10.628Z"
        }
    ]
}
```

_Response (400 - Bad Request)_ //to be updated//

```json
{
  "message": "Status string invalid"
}
```




&nbsp;

## 4. PUT /admin/:id

Description:
- Change properties of a report

Request:

- headers:

```json
{
  "access_token" : "string",
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "statusCode": 201,
    "message": "Report created successfully",
    "data": {
        "id": 2,
        "imageUrl": "https://thumbs.dreamstime.com/b/hole-road-asphalt-defects-dangerous-encounter-road-hole-road-asphalt-defects-dangerous-142354425.jpg",
        "description": "kacawwww",
        "latitude": "-6.320992",
        "longitude": "106.849308",
        "UploaderId": 1,
        "updatedAt": "2022-06-21T10:51:06.839Z",
        "createdAt": "2022-06-21T10:51:06.839Z",
        "status": "Waiting for confirmation",
        "respMessage": "No message from Administrator yet"
    }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Report not found"
}
```

_Response (400 - Bad Request)_ //to be updated//

```json
{
  "message": "imageUrl is required"
}
OR
{
  "message": "Latitude is required"
}
OR
{
  "message": "Longitude is required"
}
```

&nbsp;

## 4. GET /public/report/:id

Description:
- Get report by ID

Request:

- headers:

```json
{
  "access_token" : "string",
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "statusCode": 200,
    "data": {
        "id": 1,
        "imageUrl": "https://thumbs.dreamstime.com/b/hole-road-asphalt-defects-dangerous-encounter-road-hole-road-asphalt-defects-dangerous-142354425.jpg",
        "description": "amblesz lhur jalanan, hadeuhhhhh",
        "latitude": "-6.320992",
        "longitude": "106.849308",
        "UploaderId": 1,
        "status": "Waiting for confirmation",
        "respMessage": "No message from Administrator yet",
        "createdAt": "2022-06-23T02:41:00.279Z",
        "updatedAt": "2022-06-23T02:41:00.279Z",
        "User": {
            "id": 1,
            "email": "user@email.com",
            "password": "$2a$08$jTE0770tohXj/YxMnxk5OeIQ/E.lcnU.PmmLPaYvE1E5T7vAX9hm.",
            "role": "normalUser",
            "phoneNumber": null,
            "createdAt": "2022-06-23T02:39:49.002Z",
            "updatedAt": "2022-06-23T02:39:49.002Z"
        }
    }
}
```

_Response (404 - Not Found)_

```json
{
    "statusCode": 404,
    "error": {
        "message": "News not found"
    }
}
```

&nbsp;


## 6. GET /public/myReport

Description:
- Get the report list of a specific user 

Request:

- headers:

```json
{
  "access_token" : "string",
}
```

_Response (200 - Created)_

```json
{
    "statusCode": 200,
    "data": [
        {
            "id": 1,
            "imageUrl": "https://thumbs.dreamstime.com/b/hole-road-asphalt-defects-dangerous-encounter-road-hole-road-asphalt-defects-dangerous-142354425.jpg",
            "description": "amblesz lhur jalanan, hadeuhhhhh",
            "latitude": "-6.320992",
            "longitude": "106.849308",
            "UploaderId": 1,
            "status": "Waiting for confirmation",
            "respMessage": "No message from Administrator yet",
            "createdAt": "2022-06-23T02:41:00.279Z",
            "updatedAt": "2022-06-23T02:41:00.279Z",
            "User": {
                "id": 1,
                "email": "user@email.com",
                "password": "$2a$08$jTE0770tohXj/YxMnxk5OeIQ/E.lcnU.PmmLPaYvE1E5T7vAX9hm.",
                "role": "normalUser",
                "phoneNumber": null,
                "createdAt": "2022-06-23T02:39:49.002Z",
                "updatedAt": "2022-06-23T02:39:49.002Z"
            }
        }
    ]
}
```

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
    "statusCode": 500,
    "error": {
        "message": "Internal Server Error"
    }
}
```
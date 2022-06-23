# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /public/register`
- `POST /public/login`
- `GET /public/news`
- `GET /public/news/:id`
- `POST /public/bookmark`
- `GET /public/bookmark`
- `POST /public/googleSign`
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
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU1ODA1MDczLCJleHAiOjE2NTU4MDg2NzN9.fRtwuRsC1EIjtZoB7Mi8wG9I15g4f9A2Tr4Rhlfe-y4",
        "authorId": 1,
        "displayEmail": "user@email.com",
        "displayRole": "normalUser"
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
        "displayEmail": "customer@email.com",
        "displayRole": "customer"
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

## 3. POST /report

Description:
- Create a new Report 

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
  "imageUrl": "string",
  "description": "text",
  "latitude": "string",
  "longitude": "integer"
}
```

_Response (201 - Created)_

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

_Response (400 - Bad Request)_ //to be updated//

```json
{
  "message": "Title is required"
}
OR
{
  "message": "Content is required"
}
```




&nbsp;

## 3. GET /public/news

Description:
- Get all news from database with status: 'active'

Request:

- headers:

```json
{
  "access_token" : "string",
}
```

_Response (200 - OK)_

```json
{
    "statusCode": 200,
    "page": 1,
    "totalPage": 2,
    "data": [
        {
            "id": 1,
            "title": "Dummy For Delete editTTTTT",
            "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. \nLorem Ipsum has been the industry's standard dummy text ever since the 1500s, \nwhen an unknown printer took a galley of type and scrambled it to make a type specimen book. \nIt has ).",
            "imgUrl": "https://loremipsum.io/assets/images/lorem-ipsum-generator-custom-placeholder-text.jpg",
            "categoryId": 3,
            "authorId": 2,
            "status": "active",
            "createdAt": "2022-06-06T07:15:11.993Z",
            "updatedAt": "2022-06-11T15:28:03.602Z",
            "User": {
                "id": 2,
                "username": "mr_staff",
                "email": "staff@email.com",
                "password": "$2a$08$fUOh4m4ZoWyhbdw/.51XU.WSV9zWcYNw5O6LftyBCgSm6rfYofJsu",
                "role": "staff",
                "phoneNumber": "089922113382",
                "address": "8 S George Mason Drive, Alexandria,va, 22302  United States",
                "createdAt": "2022-06-06T07:15:11.958Z",
                "updatedAt": "2022-06-06T07:15:11.958Z"
            },
            "Category": {
                "id": 3,
                "name": "Tech",
                "createdAt": "2022-06-06T07:15:11.923Z",
                "updatedAt": "2022-06-06T07:15:11.923Z"
            }
        },
    ]
}
```

&nbsp;

## 4. GET /public/news/:id

Description:
- Get news by ID

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
        "title": "Dummy For Delete editTTTTT",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. \nLorem Ipsum has been the industry's standard dummy text ever since the 1500s, \nwhen an unknown printer took a galley of type and scrambled it to make a type specimen book. \nIt has survived not only five centuries, but also the leap into electronic typesetting, \nremaining essentially unchanged. It was popularised in the  versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        "imgUrl": "https://loremipsum.io/assets/images/lorem-ipsum-generator-custom-placeholder-text.jpg",
        "categoryId": 3,
        "authorId": 2,
        "status": "active",
        "createdAt": "2022-06-06T07:15:11.993Z",
        "updatedAt": "2022-06-11T15:28:03.602Z",
        "User": {
            "id": 2,
            "username": "mr_staff",
            "email": "staff@email.com",
            "password": "$2a$08$fUOh4m4ZoWyhbdw/.51XU.WSV9zWcYNw5O6LftyBCgSm6rfYofJsu",
            "role": "staff",
            "phoneNumber": "089922113382",
            "address": "8 S George Mason Drive, Alexandria,va, 22302  United States",
            "createdAt": "2022-06-06T07:15:11.958Z",
            "updatedAt": "2022-06-06T07:15:11.958Z"
        },
        "Category": {
            "id": 3,
            "name": "Tech",
            "createdAt": "2022-06-06T07:15:11.923Z",
            "updatedAt": "2022-06-06T07:15:11.923Z"
        }
    },
    "qr": "data:image/png;base64,+YSZyTdqm1czk1dt82pm8qpt//BQAebQDgYAMABxsAONgAwMEGAA42AHCwAYCDDQAcbADgYAMABxsAOPgP+0wqLWI91+UAAAAASUVORK5CYII="
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

## 5. POST /public/bookmark

Description:
- Create a new Boomark 

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
  "NewsId": "integer",
}
```

_Response (200 - Created)_

```json
{
    "statusCode": 200,
    "message": "Bookmark added successfully!"
}
```

_Response (409 - Conflict)_ 

```json
{
    "statusCode": 409,
    "error": {
        "message": "Bookmark Already Exist"
    }
}
```

&nbsp;

## 6. GET /public/bookmark

Description:
- Get the bookmark list of a specific user 

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
            "UserId": 3,
            "NewsId": 3,
            "createdAt": "2022-06-15T09:38:14.349Z",
            "updatedAt": "2022-06-15T09:38:14.349Z",
            "News": {
                "id": 3,
                "title": "What is Lorem Ipsum?",
                "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. \nLorem Ipsum has been the industry's standard dummy text ever since the 1500s, \nwhen an unknown printer took a galley of type and scrambled it to make a type specimen book. \nIt has survived not only five centuries, but also the leap into electronic typesetting, \nremaining essentially unchanged. It was popularised in the 1960s with the release of \nLetraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus \nPageMaker including versions of Lorem Ipsum.\n\nWhy do we use it?\nIt is a long established fact that a reader will be distracted by the readable content \nof a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal \ndistribution of letters, as opposed to using 'Content here, content here', making it look like readable English. \nMany desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.\n'lorem ipsum' will uncover many web sites still in their infancy. \nVarious versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
                "imgUrl": "https://loremipsum.io/assets/images/lorem-ipsum-generator-custom-placeholder-text.jpg",
                "categoryId": 3,
                "authorId": 1,
                "status": "active",
                "createdAt": "2022-06-06T07:15:11.993Z",
                "updatedAt": "2022-06-06T07:15:11.993Z"
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
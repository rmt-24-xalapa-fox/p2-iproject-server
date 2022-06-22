## RESTful endpoints

## 1. POST /register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "username": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Username is required"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "username": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Username is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /laundries

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
      "id": 1,
      "name": "Adinda's Laundry",
      "email": "adinda@mail.com",
      "phone": "081388888888",
      "address": "RW 03, Pondok Pinang, Kebayoran Lama, South Jakarta, Jakarta Special Capital Region, 12240, Indonesia",
      "latitude": "-6.26295",
      "longitude": "106.78124",
      "county": "Jakarta Selatan",
      "socialMedia": "https://www.instagram.com/ismailnlhkm/",
      "createdAt": "2022-06-21T18:10:11.918Z",
      "updatedAt": "2022-06-21T18:10:11.918Z"
  },
  {
      "id": 2,
      "name": "Cantika's Laundry",
      "email": "cantika@mail.com",
      "phone": "081388888888",
      "address": "Jalan Pinang Perak, RW 03, Pondok Pinang, Kebayoran Lama, South Jakarta, Jakarta Special Capital Region, 12310, Indonesia",
      "latitude": "-6.26513",
      "longitude": "106.77841",
      "county": "Jakarta Selatan",
      "socialMedia": "https://www.instagram.com/ismailnlhkm/",
      "createdAt": "2022-06-21T18:10:11.918Z",
      "updatedAt": "2022-06-21T18:10:11.918Z"
  },
  ...
]
```

&nbsp;

## 4. POST /neworder/:LaundryId

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "UserId": "integer",
  "LaundryId": "integer",
  "service": "string",
  "kg": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": 9,
  "UserId": 1,
  "LaundryId": 1,
  "service": "Express",
  "kg": 2,
  "cost": 20000,
  "updatedAt": "2022-06-22T07:15:08.028Z",
  "createdAt": "2022-06-22T07:15:08.028Z",
  "status": "waiting for payment"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Service is required"
}
OR
{
  "message": "Kg is required"
}
OR
{
  "message": "Minimum kg is 1"
}
OR
{
  "message": "Maximum kg is 15"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Service not found"
}
OR
{
  "message": "Laundry not found"
}
```

&nbsp;

## 5. GET /myorders

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
      "id": 1,
      "UserId": 1,
      "LaundryId": 1,
      "service": "Regular",
      "kg": 1,
      "cost": 6000,
      "status": "waiting for payment",
      "createdAt": "2022-06-22T06:57:08.426Z",
      "updatedAt": "2022-06-22T06:57:08.426Z",
      "Laundry": {
          "id": 1,
          "name": "Adinda's Laundry",
          "email": "adinda@mail.com",
          "phone": "081388888888",
          "address": "RW 03, Pondok Pinang, Kebayoran Lama, South Jakarta, Jakarta Special Capital Region, 12240, Indonesia",
          "latitude": "-6.26295",
          "longitude": "106.78124",
          "county": "Jakarta Selatan",
          "socialMedia": "https://www.instagram.com/ismailnlhkm/",
          "createdAt": "2022-06-21T18:10:11.918Z",
          "updatedAt": "2022-06-21T18:10:11.918Z"
      }
  },
  ...,
]
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

## Endpoints :

List of available endpoints:

- `POST /handlepayment`
- `POST /registercompany`
- `POST /registeruser`
- `POST /logincompany`
- `POST /loginuser`

Routes below need authentication:

- `GET /getpaymentlink`
- `GET /users`
- `PATCH /users/:userId`
- `GET /ticket`
- `POST /ticket`
- `PATCH /ticket/:ticketId`
- `GET /task`
- `GET /completedtask`
- `POST /sendinvite`

&nbsp;

## 1. POST /handlepayment

```
endpoint to handle after payment from midtrans

```

&nbsp;

## 2. POST /registercompany

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Validation Error"
}
```

&nbsp;

## 3. POST /registeruser

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
  "token": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string",
  "role": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Validation Error"
}
```

&nbsp;

## 4. POST /logincompany

Request:

- body:

```json
{
  "email": "string",
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
  "message": "Validation Error"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 5. POST /loginuser

Request:

- body:

```json
{
  "email": "string",
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
  "message": "Validation Error"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 6. GET /getpaymentlink

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "payment": "object"
}
```

&nbsp;

## 7. GET /users

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
    "users": "object"
]
```

&nbsp;

## 8. PATCH /users/:userId

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "message": "string"
}
```

&nbsp;

## 9. GET /ticket

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
    "tickets": "object"
]
```

&nbsp;

## 10. POST /ticket

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

- body: 

```json
{
  "description": "string"
}
```

_Response (201 - Created)_

```json
{
    "id": "integer",
    "description": "string",
    "status": "string"
}
```

## 11. PATCH /ticket/:ticketId

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

- body: 

```json
{
  "status": "string"
}
```

_Response (200 - OK)_

```json
{
    "message": "string"
}
```

&nbsp;

## 12. GET /task

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "tickets": "object"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "InvalidToken"
}
```

&nbsp;

## 13. GET /completedtask

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "tickets": "object"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "InvalidToken"
}
```

&nbsp;

## 14. POST /sendinvite

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

- body: 

```json
{
  "email": "string"
}
```

_Response (200 - Created)_

```json
{
    "info": "object"
}
```
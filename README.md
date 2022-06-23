# p2-iproject-server

Individual Project - Server

### API ENDPOINT

- `POST /register` = create new User
- `POST /login` = login the apllication
- `POST /google-sign` = login the apllication with gmail

- `GET /tour` = show all data Tour
- `GET /tour/:id` = show all data Tour by Id

### POST /register

#### Request

- Body

```json
{
  "username": String,
  "email": String,
  "password": String,
  "phoneNumber": String,
  "address": String
}

```

#### Response

_201_

```json
{
  "id": Integer,
  "email": String
}


```

### POST /login

#### Request

- Body

```json
{
  "email": String,
  "password": String,
}

```

#### Response

_200_

```json
{
  "access_token": String
}

```

### POST /google-sign

#### Request

- Body

```json
{
  "credential": String
}

```

#### Response

_200_

```json
{
  "access_token": String
}

```

_201_

```json
{
  "access_token": String
}

```

### GET /tour

### Response

```json
{
  "response": Object
}


```

### GET /tour/:id

### Request

- params

```json
{
  id: Integer
}

```

### Response

_200_

```json
{
  "response": Object
}

```

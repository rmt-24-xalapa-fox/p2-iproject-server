## Endpoints

List of Available Endpoints:

- `POST /register`
- `POST /login`
- `POST /palettes`
- `GET /palettes/generate`
- `GET /palettes/add`
- `GET /palettes/:colorPaletteId`
- `GET /profile`
- `POST /profile/edit`
- `POST /profile/tokenUpgrade`
- `POST /profile/upgradePlan`

### POST /pub/register

### Description

- Create a new user

### Request

- Headers

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

- Body

```json
{
  "username": "String",
  "email": "String",
  "password": "String",
  "profilePicture": "File"
}
```

#### Response

_201 - Created_

- Body

```json
{
  "id": "Integer",
  "name": "String",
  "email": "String",
  "message": "Account successfully created"
}
```

_400 - Bad Request_

- Body

```json
{
  "statusCode": 400,
  "error": {
    "message": "Array"
  }
}
```

### POST /login

### Description

- Get access token after user authentication

### Request

- Headers

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

- Body

```json
{
  "email": "String",
  "password": "String"
}
```

#### Response

_200 - OK_

- Body

```json
{
  "accessToken": "String"
}
```

_400 - Bad Request_

- Body

```json
{
  "statusCode": 400,
  "message": "Email can't be empty" or "Password can't be empty"
}
```

_401 - Unauthorized_

- Body

```json
{
  "statusCode": 401,
  "message": "Invalid email/password"
}
```

### GET /palettes

### Description

- Get all colorPalettes by userId

### Request

- Headers

```json
{
  "access_token": "String"
}
```

#### Response

_200 - OK_

- Body

```json
[
  {
    "name": "String",
    "colors": "Array",
    "UserId": "integer",
    "User": {
      "name": "String",
      "profilePicture": "String"
    }
  }
]
```

### GET /palettes/generate

### Description

- Generate random colorPalette by colorScheme

### Request

- Headers

```json
{
  "access_token": "String"
}
```

- Params

```json
{
  "colorScheme": "String"
}
```

#### Response

_200 - OK_

- Body

```json
{
  "palette": "Array"
}
```

### POST /palettes/add

### Description

- Create colorPalette

### Request

- Headers

```json
{
  "access_token": "String"
}
```

- Body

```json
{
  "name": "String",
  "colors": "Array"
}
```

#### Response

_200 - OK_

- Body

```json
{
  "id": "Integer",
  "name": "String",
  "message": "Color palette added successfully"
}
```

_400 - Bad Request_

- Body

```json
{
  "statusCode": 400,
  "error": {
    "message": "Array"
  }
}
```

### GET /palettes/:colorPaletteId

### Description

- Get colorPalette by colorPaletteId

### Request

- Headers

```json
{
  "access_token": "String"
}
```

- Params

```json
{
  "colorPaletteId": "Integer"
}
```

#### Response

_200 - OK_

- Body

```json
{
  "name": "String",
  "colors": "Array",
  "UserId": "integer"
}
```

_404 - Not Found_

- Body

```json
{
  "message": "Palette not found"
}
```

### GET /profile

### Description

- Get authenticated user data

### Request

- Headers

```json
{
  "access_token": "String"
}
```

#### Response

_200 - OK_

- Body

```json
{
  "name": "String",
  "email": "String",
  "plan": "String",
  "profilePicture": "String"
}
```

### PATCH /profile/edit

### Description

- Edit authenticated user data

### Request

- Headers

```json
{
  "access_token": "String"
}
```

- Body

```json
{
  "username": "String",
  "email": "String",
  "password": "String",
  "profilePicture": "File"
}
```

#### Response

_200 - OK_

- Body

```json
{
  "message": "Your profile has been updated"
}
```

### POST /profile/tokenUpgrade

### Description

- Create payment token for upgrade plan

### Request

- Headers

```json
{
  "access_token": "String"
}
```

#### Response

_201 - Created_

- Body

```json
{
  "token": "String"
}
```

### PATCH /profile/upgradePlan

### Description

- Change user's plan to premium

### Request

- Headers

```json
{
  "access_token": "String"
}
```

#### Response

_200 - OK_

- Body

```json
{
  " message": "Your account's plan has been upgraded"
}
```

_403 - Forbidden_

- Body

```json
{
  " message": "Your account is already premium"
}
```

### Global Error

#### Response

_401 - Unauthorized_

- Body

```json
{
  "statusCode": 401,
  "message": "Invalid token"
}
```

_500 - Internal Server Error_

- Body

```json
{
  "statusCode": 500,
  "message": "Internal Server Error"
}
```

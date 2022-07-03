# PS Anywhere API Documentation

_Player_

```
- email : string, required, unique
- password : string, required
```

_Operator_

```
- email : string, required, unique
- password : string, required
```

_Rentalan_

```
- name : string, required
- address : string, required
- phone : string, required
- iconImage: string
- OperatorId: integer, required
```

_Unit_

```
- psType : string, required 
- status : string, required
- RentalanId : integer. required
- PlayerId : integer
```

## Endpoints :

List of available endpoints:

- `POST /player/register`
- `POST /player/login`

Routes below need authentication:

- `GET /rentalan`
- `GET /rentalan/:id`
- `PATCH /rentalan/:UnitId`

&nbsp;

## 1. POST /register

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
  "msg": "success register"
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
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

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
   "email": "string",
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "email/password invalid"
}
```

&nbsp;

## 3. GET /rentalan

Description:
- Get all rentalan from database

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
    "rentalan": [
        {
            "id": 1,
            "name": "Rental Playstation Tiger",
            "address": "Jl. MT. Haryono No.89, Dusun 3, Purbalingga Kulon, Kec. Purbalingga, Kabupaten Purbalingga, Jawa Tengah",
            "phone": "028167854",
            "iconImage": "https://c4.wallpaperflare.com/wallpaper/977/2/363/tiger-background-beast-wallpaper-preview.jpg",
            "OperatorId": 1
        },
        {
            "id": 2,
            "name": "Bless Gamestation Rental Playstation PS3 & PS4",
            "address": "Jl. Letkol Isdiman No.86, Bancar, Kec. Purbalingga, Kabupaten Purbalingga, Jawa Tengah",
            "phone": "028167854",
            "iconImage": "https://cdn.wccftech.com/wp-content/uploads/2018/01/WCCFps4controller-740x429.jpg",
            "OperatorId": 2
        }
    ]
}
```

&nbsp;

## 4. GET /rentalan/:id

Description:
- Get rentalan by id from database

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
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
    "perRentalan": {
        "id": 1,
        "name": "Rental Playstation Tiger",
        "address": "Jl. MT. Haryono No.89, Dusun 3, Purbalingga Kulon, Kec. Purbalingga, Kabupaten Purbalingga, Jawa Tengah",
        "phone": "028167854",
        "iconImage": "https://c4.wallpaperflare.com/wallpaper/977/2/363/tiger-background-beast-wallpaper-preview.jpg",
        "OperatorId": 1,
        "Units": [
            {
                "id": 1,
                "psType": "PS3",
                "status": "Booked",
                "RentalanId": 1,
                "PlayerId": null,
                "createdAt": "2022-06-22T14:39:49.498Z",
                "updatedAt": "2022-06-22T16:09:07.986Z"
            },
            {
                "id": 2,
                "psType": "PS3",
                "status": "Booked",
                "RentalanId": 1,
                "PlayerId": null,
                "createdAt": "2022-06-22T14:39:49.498Z",
                "updatedAt": "2022-06-22T16:18:01.411Z"
            },
            {
                "id": 3,
                "psType": "PS3",
                "status": "available ",
                "RentalanId": 1,
                "PlayerId": null,
                "createdAt": "2022-06-22T14:39:49.498Z",
                "updatedAt": "2022-06-22T14:39:49.498Z"
            },
            {
                "id": 4,
                "psType": "PS3",
                "status": "available ",
                "RentalanId": 1,
                "PlayerId": null,
                "createdAt": "2022-06-22T14:39:49.498Z",
                "updatedAt": "2022-06-22T14:39:49.498Z"
            },
            {
                "id": 5,
                "psType": "PS3",
                "status": "available ",
                "RentalanId": 1,
                "PlayerId": null,
                "createdAt": "2022-06-22T14:39:49.498Z",
                "updatedAt": "2022-06-22T14:39:49.498Z"
            },
            {
                "id": 6,
                "psType": "PS4",
                "status": "available ",
                "RentalanId": 1,
                "PlayerId": null,
                "createdAt": "2022-06-22T14:39:49.498Z",
                "updatedAt": "2022-06-22T14:39:49.498Z"
            },
            {
                "id": 7,
                "psType": "PS4",
                "status": "Booked",
                "RentalanId": 1,
                "PlayerId": null,
                "createdAt": "2022-06-22T14:39:49.498Z",
                "updatedAt": "2022-06-22T16:36:11.556Z"
            },
            {
                "id": 8,
                "psType": "PS4",
                "status": "Booked",
                "RentalanId": 1,
                "PlayerId": null,
                "createdAt": "2022-06-22T14:39:49.498Z",
                "updatedAt": "2022-06-23T00:55:47.305Z"
            }
        ]
    }
}
```

&nbsp;

## 5. PATCH /rentalan/:UnitId

Description:
- Book unit where available

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
  "UnitId": "integer"
}
```

_Response (200 - OK)_

```json
{
    "msg": "Unit where id 1 booked"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Not found Unit"
}
```

&nbsp;
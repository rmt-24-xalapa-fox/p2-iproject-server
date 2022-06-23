# API Documentation

## List of available endpoints:

- `GET /user`
- `POST /user/register`
- `POST /user/login`
- `GET /movie/popular`
- `GET /movie/upcoming`
- `GET /movie/detail`
- `GET /actor/popular`
- `GET /genre/list`
- `GET /search/movies`
- `GET /actor/popular`

## Routes below need authentication

- `GET /favourite/`
- `POST /favourite/add`
- `DELETE /favourite/delete`

### 1. GET /user

_Response (200 - OK)_

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": 1,
      "nickname": "sisi2",
      "email": "sisi2@email.com"
    }
  ]
}
```

### 2. POST /user/register

Request:

- body:

```json
{
  "nickname": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "statusCode": 201,
  "message": "Succes created user",
  "data": {
    "id": 2,
    "email": "sisi@email.com"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "statusCode": 400,
  "error": {
    "message": "Email address already in use!"
  }
}
```

### 3. POST user/login

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
  "statusCode": 200,
  "message": "Succes Login",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmlja25hbWUiOiJzaXNpMiIsImVtYWlsIjoic2lzaTJAZW1haWwuY29tIiwiaWF0IjoxNjU1OTI2ODI0fQ.Z5en9EV2Abpt3LuArzPgFnoswE8k0UWD4KfdvwgjOWo",
  "payload": {
    "id": 1,
    "nickname": "sisi2",
    "email": "sisi2@email.com"
  }
}
```

### 4. GET /movie/popular

_Response (200 - OK)_

```json
{
    "page": 1,
    "results": [
        {
            "adult": false,
            "backdrop_path": "/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg",
            "genre_ids": [
                14,
                28,
                12
            ],
            "id": 453395,
            "original_language": "en",
            "original_title": "Doctor Strange in the Multiverse of Madness",
            "overview": "Doctor Strange, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary.",
            "popularity": 3901.541,
            "poster_path": "/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
            "release_date": "2022-05-04",
            "title": "Doctor Strange in the Multiverse of Madness",
            "video": false,
            "vote_average": 7.5,
            "vote_count": 2439
        },
    ...
    ]
}
```

### 5. GET /movie/upcoming

_Response (200 - OK)_

```json
{
    "dates": {
        "maximum": "2022-07-14",
        "minimum": "2022-06-21"
    },
    "page": 1,
    "results": [
        {
            "adult": false,
            "backdrop_path": "/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg",
            "genre_ids": [
                14,
                28,
                12
            ],
            "id": 453395,
            "original_language": "en",
            "original_title": "Doctor Strange in the Multiverse of Madness",
            "overview": "Doctor Strange, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary.",
            "popularity": 3901.541,
            "poster_path": "/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
            "release_date": "2022-05-04",
            "title": "Doctor Strange in the Multiverse of Madness",
            "video": false,
            "vote_average": 7.5,
            "vote_count": 2439
        },
    ...
    ]
}
```

### 6. GET /movie/detail

_Response (200 - OK)_

```json
{
  "adult": false,
  "backdrop_path": "/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg",
  "belongs_to_collection": {
    "id": 618529,
    "name": "Doctor Strange Collection",
    "poster_path": "/oa5uQOTY9Y4ERNrsDk7E0eC1E3h.jpg",
    "backdrop_path": "/5ZuctJh5uX5L2dz1CjA7WsTJwZk.jpg"
  },
  "budget": 200000000,
  "genres": [
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    }
  ],
  "homepage": "https://www.marvel.com/movies/doctor-strange-in-the-multiverse-of-madness",
  "id": 453395,
  "imdb_id": "tt9419884",
  "original_language": "en",
  "original_title": "Doctor Strange in the Multiverse of Madness",
  "overview": "Doctor Strange, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary.",
  "popularity": 3901.541,
  "poster_path": "/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg"
}
```

### 7. GET /actor/popular

_Response (200 - OK)_

```json
{
    "page": 1,
    "results": [
        {
            "adult": false,
            "gender": 1,
            "id": 6161,
            "known_for": [
                {
                    "adult": false,
                    "backdrop_path": "/tTlAA0REGPXSZPBfWyTW9ipIv1I.jpg",
                    "genre_ids": [
                        28,
                        12,
                        878,
                        18
                    ],
                    "id": 315635,
                    "media_type": "movie",
                    "original_language": "en",
                    "original_title": "Spider-Man: Homecoming",
                    "overview": "Following the events of Captain America: Civil War, Peter Parker, with the help of his mentor Tony Stark, tries to balance his life as an ordinary high school student in Queens, New York City, with fighting crime as his superhero alter ego Spider-Man as a new threat, the Vulture, emerges.",
                    "poster_path": "/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg",
                    "release_date": "2017-07-05",
                    "title": "Spider-Man: Homecoming",
                    "video": false,
                    "vote_average": 7.4,
                    "vote_count": 18722
                },
                {
                    "adult": false,
                    "backdrop_path": "/vVBcIN68kFq681b4lObiNJhEVro.jpg",
                    "genre_ids": [
                        18,
                        10749
                    ],
                    "id": 453,
                    "media_type": "movie",
                    "original_language": "en",
                    "original_title": "A Beautiful Mind",
                    "overview": "John Nash is a brilliant but asocial mathematician fighting schizophrenia. After he accepts secret work in cryptography, his life takes a turn for the nightmarish.",
                    "poster_path": "/zwzWCmH72OSC9NA0ipoqw5Zjya8.jpg",
                    "release_date": "2001-12-11",
                    "title": "A Beautiful Mind",
                    "video": false,
                    "vote_average": 7.9,
                    "vote_count": 8556
                },

            ]
        }
    ]

    ...
}
```

### 8. GET /genre/list

_Response (200 - OK)_

```json
{
    "genres": [
        {
            "id": 28,
            "name": "Action"
        },
        {
            "id": 12,
            "name": "Adventure"
        },
        ...
    ]
}
```

### 9. GET /search/movies

_body_

```json
{
  "search": "string"
}
```

_Response (200 - OK)_

```json
{
    "page": 1,
    "results": [
        {
            "adult": false,
            "backdrop_path": "/yFuKvT4Vm3sKHdFY4eG6I4ldAnn.jpg",
            "genre_ids": [
                28,
                12,
                878
            ],
            "id": 1771,
            "original_language": "en",
            "original_title": "Captain America: The First Avenger",
            "overview": "During World War II, Steve Rogers is a sickly man from Brooklyn who's transformed into super-soldier Captain America to aid in the war effort. Rogers must stop the Red Skull – Adolf Hitler's ruthless head of weaponry, and the leader of an organization that intends to use a mysterious device of untold powers for world domination.",
            "popularity": 90.202,
            "poster_path": "/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg",
            "release_date": "2011-07-22",
            "title": "Captain America: The First Avenger",
            "video": false,
            "vote_average": 7,
            "vote_count": 18703
        },
        ...
    ]
}
```

### 10. GET /actor/popular

_Response (200 - OK)_

```json
{
    "page": 1,
    "results": [
        {
            "adult": false,
            "gender": 1,
            "id": 6161,
            "known_for": [
                {
                    "adult": false,
                    "backdrop_path": "/tTlAA0REGPXSZPBfWyTW9ipIv1I.jpg",
                    "genre_ids": [
                        28,
                        12,
                        878,
                        18
                    ],
                    "id": 315635,
                    "media_type": "movie",
                    "original_language": "en",
                    "original_title": "Spider-Man: Homecoming",
                    "overview": "Following the events of Captain America: Civil War, Peter Parker, with the help of his mentor Tony Stark, tries to balance his life as an ordinary high school student in Queens, New York City, with fighting crime as his superhero alter ego Spider-Man as a new threat, the Vulture, emerges.",
                    "poster_path": "/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg",
                    "release_date": "2017-07-05",
                    "title": "Spider-Man: Homecoming",
                    "video": false,
                    "vote_average": 7.4,
                    "vote_count": 18722
                },
                ...
            ]
        }
    ],
    "known_for_department": "Acting",
    "name": "Jennifer Connelly",
    "popularity": 193.186,
    "profile_path": "/egh1eOHuYgeoqdlLQgaXMl6cPOm.jpg"
}
```

### 11. GET /favourite

_headers_

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  {
        "id": 1,
        "title": "Doctor Strange in the Multiverse of Madness",
        "imageUrl": "https://image.tmdb.org/t/p/w500//9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
        "vote": 75,
        "release": "2022-05-04",
        "genre": "Fantasy",
        "movieId": 453395,
        "UserId": 1
    }
    ...
}
```

### 12. POST /favourite/add

_headers_
```json
{
  "access_token": "string"
}
```

_body_
```json
{
  "title": "string",
  "imageUrl": "string",
  "vote": "integer",
  "release": "string",
  "genre": "string",
  "movieId": "integer"
}
```
_Response (201 - Created)_
```json
{
    "statusCode": 201,
    "message": "Succes added to favourite",
    "data": {
        "id": 7,
        "title": "Doctor Stranger",
        "imageUrl": "https://image.tmdb.org/t/p/w500//9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
        "vote": 75,
        "release": "2022-05-04",
        "genre": "Fantasy",
        "movieId": null,
        "UserId": 1,
        "updatedAt": "2022-06-23T02:28:52.009Z",
        "createdAt": "2022-06-23T02:28:52.009Z"
    }
}
```

### 12. DELETE /favourite/add

_headers_

```json
{
  "access_token": "string"
}
```

_body_

````json
{
  "id": "integer",
}
_Response (201 - Created)_

```json
{
    "statusCode": 200,
    "message": "Favorite with id 1 deleted successfully",
}
````

### Global Error
_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid token"
}
```
_Response (403 - Forbidden)_
```json
{
  "message": "You are not authorized"
}
```
_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```


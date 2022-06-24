# REDMARVEL24 API Documentation

## Endpoints

List of available endpoints:

- `POST /marvel/register`
- `POST /marvel/login`
- `POST /marvel/login-google`

- `GET /marvel/characters`
- `GET /marvel/comics`
- `GET /marvel/new-comics`
- 'GET /marvel/comics/:characterId'

## 1. POST /marvel/register
Description: 
- Register for public users

Request: 

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
    "statusCode": 201,
    "message": "Account has been created",
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
  "message": "Email has been taken"
}
OR
{
  "message": "Password at least 5 characters"
}
OR
{
  "message": "Password is required"
}
```
&nbsp;

## 2. POST /marvel/login
Description:
- Login for public users

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
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. POST marvel/login-google
Description:
- Login for public User with google account (registered or not)

Request:

- Headers:

```json
{
  "credential": "string",
}
```

_Response (200 - OK)_

```json
{
  "statusCode": 200,
  "message": "Wellcome",
  "access_token": "string",
  "email": "string",
}
```
&nbsp;

## 4. GET /marvel/characters`
Description:
- Get all character marvel comics from database marvel API


Request:

- query: 

```json
{
  "name": "string",
  "page": "number",
}
```

_Response (200 - OK)_

```json
{
    "code": 200,
    "status": "Ok",
    "copyright": "© 2022 MARVEL",
    "attributionText": "Data provided by Marvel. © 2022 MARVEL",
    "attributionHTML": "<a href=\"http://marvel.com\">Data provided by Marvel. © 2022 MARVEL</a>",
    "etag": "c1bf158de4488f68e949d78e357e522bbba365e4",
    "data": {
        "offset": 0,
        "limit": 50,
        "total": 84,
        "count": 50,
        "results": [
            {
                "id": 1017100,
                "name": "A-Bomb (HAS)",
                "description": "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction! ",
                "modified": "2013-09-18T15:54:04-0400",
                "thumbnail": {
                    "path": "http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16",
                    "extension": "jpg"
                },
                "resourceURI": "http://gateway.marvel.com/v1/public/characters/1017100",
                "comics": {
                    "available": 4,
                    "collectionURI": "http://gateway.marvel.com/v1/public/characters/1017100/comics",
                    "items": [
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/comics/47176",
                            "name": "FREE COMIC BOOK DAY 2013 1 (2013) #1"
                        },
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/comics/40632",
                            "name": "Hulk (2008) #53"
                        },
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/comics/40630",
                            "name": "Hulk (2008) #54"
                        },
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/comics/40628",
                            "name": "Hulk (2008) #55"
                        }
                    ],
                    "returned": 4
                },
                "series": {
                    "available": 2,
                    "collectionURI": "http://gateway.marvel.com/v1/public/characters/1017100/series",
                    "items": [
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/series/17765",
                            "name": "FREE COMIC BOOK DAY 2013 1 (2013)"
                        },
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/series/3374",
                            "name": "Hulk (2008 - 2012)"
                        }
                    ],
                    "returned": 2
                },
                "stories": {
                    "available": 7,
                    "collectionURI": "http://gateway.marvel.com/v1/public/characters/1017100/stories",
                    "items": [
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/stories/92078",
                            "name": "Hulk (2008) #55",
                            "type": "cover"
                        },
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/stories/92079",
                            "name": "Interior #92079",
                            "type": "interiorStory"
                        },
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/stories/92082",
                            "name": "Hulk (2008) #54",
                            "type": "cover"
                        },
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/stories/92083",
                            "name": "Interior #92083",
                            "type": "interiorStory"
                        },
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/stories/92086",
                            "name": "Hulk (2008) #53",
                            "type": "cover"
                        },
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/stories/92087",
                            "name": "Interior #92087",
                            "type": "interiorStory"
                        },
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/stories/105929",
                            "name": "cover from Free Comic Book Day 2013 (Avengers/Hulk) (2013) #1",
                            "type": "cover"
                        }
                    ],
                    "returned": 7
                },
                "events": {
                    "available": 0,
                    "collectionURI": "http://gateway.marvel.com/v1/public/characters/1017100/events",
                    "items": [],
                    "returned": 0
                },
                "urls": [
                    {
                        "type": "detail",
                        "url": "http://marvel.com/characters/76/a-bomb?utm_campaign=apiRef&utm_source=c56d1d73b83c9404918d14d1a390e039"
                    },
                    {
                        "type": "comiclink",
                        "url": "http://marvel.com/comics/characters/1017100/a-bomb_has?utm_campaign=apiRef&utm_source=c56d1d73b83c9404918d14d1a390e039"
                    }
                ]
            },
        ...
        ]
    }
}

```

&nbsp;

## 5. GET /marvel/comics`
Description:
- Get all comics from database marvel API

Request:

- query:

```json
{
  "year": "number",
  "page": "number",
}
```
_Response (200 - OK)_

```json
{
     "code": 200,
    "status": "Ok",
    "copyright": "© 2022 MARVEL",
    "attributionText": "Data provided by Marvel. © 2022 MARVEL",
    "attributionHTML": "<a href=\"http://marvel.com\">Data provided by Marvel. © 2022 MARVEL</a>",
    "etag": "10abe66e0d7419f626bfce0c868acc2186a66319",
    "data": {
        "offset": 0,
        "limit": 24,
        "total": 1100,
        "count": 24,
        "results": [
            {
                "id": 100076,
                "digitalId": 58398,
                "title": "Spider-Men Infinity Comic (2022) #8",
                "issueNumber": 8,
                "variantDescription": "",
                "description": null,
                "modified": "2021-11-11T09:08:18-0500",
                "isbn": "",
                "upc": "75960620348200811",
                "diamondCode": "",
                "ean": "",
                "issn": "",
                "format": "Digital Vertical Comic",
                "pageCount": 10,
                "textObjects": [],
                "resourceURI": "http://gateway.marvel.com/v1/public/comics/100076",
                "urls": [
                    {
                        "type": "detail",
                        "url": "http://marvel.com/comics/issue/100076/spider-men_infinity_comic_2022_8?utm_campaign=apiRef&utm_source=c56d1d73b83c9404918d14d1a390e039"
                    },
                    {
                        "type": "reader",
                        "url": "http://marvel.com/digitalcomics/view.htm?iid=58398&utm_campaign=apiRef&utm_source=c56d1d73b83c9404918d14d1a390e039"
                    }
                ],
                "series": {
                    "resourceURI": "http://gateway.marvel.com/v1/public/series/34401",
                    "name": "Spider-Men Infinity Comic (2022 - Present)"
                },
                "variants": [],
                "collections": [],
                "collectedIssues": [],
                "dates": [
                    {
                        "type": "onsaleDate",
                        "date": "2029-12-31T00:00:00-0500"
                    },
                    {
                        "type": "focDate",
                        "date": "2029-12-03T00:00:00-0500"
                    },
                    {
                        "type": "unlimitedDate",
                        "date": "2021-12-29T00:00:00-0500"
                    }
                ],
                "prices": [
                    {
                        "type": "printPrice",
                        "price": 0
                    }
                ],
                "thumbnail": {
                    "path": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
                    "extension": "jpg"
                },
                "images": [],
                "creators": {
                    "available": 1,
                    "collectionURI": "http://gateway.marvel.com/v1/public/comics/100076/creators",
                    "items": [
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/creators/4430",
                            "name": "Jeff Youngquist",
                            "role": "editor"
                        }
                    ],
                    "returned": 1
                },
                "characters": {
                    "available": 0,
                    "collectionURI": "http://gateway.marvel.com/v1/public/comics/100076/characters",
                    "items": [],
                    "returned": 0
                },
                "stories": {
                    "available": 2,
                    "collectionURI": "http://gateway.marvel.com/v1/public/comics/100076/stories",
                    "items": [
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/stories/221253",
                            "name": "cover from Amazing Spider-Man: Spider-Verse Infinity Comic (2021) #8",
                            "type": "cover"
                        },
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/stories/221254",
                            "name": "story from Amazing Spider-Man: Spider-Verse Infinity Comic (2021) #8",
                            "type": "interiorStory"
                        }
                    ],
                    "returned": 2
                },
                "events": {
                    "available": 0,
                    "collectionURI": "http://gateway.marvel.com/v1/public/comics/100076/events",
                    "items": [],
                    "returned": 0
                }
            },
            ...
        ]
    }
}

```

&nbsp;

## 6. GET /marvel/new-comics`
Description:
- Get all comics marvel from database marvel API that published in this year (2022)

_Response (200 - OK)_

```json
{
     "code": 200,
    "status": "Ok",
    "copyright": "© 2022 MARVEL",
    "attributionText": "Data provided by Marvel. © 2022 MARVEL",
    "attributionHTML": "<a href=\"http://marvel.com\">Data provided by Marvel. © 2022 MARVEL</a>",
    "etag": "b79fe176b2d9b4453b80282d1c6dfe8484eec7ea",
    "data": {
        "offset": 9,
        "limit": 9,
        "total": 1100,
        "count": 9,
        "results": [
            {
                "id": 94962,
                "digitalId": 0,
                "title": "Gambit (2022) #4",
                "issueNumber": 4,
                "variantDescription": "",
                "description": null,
                "modified": "2022-04-28T23:45:32-0400",
                "isbn": "",
                "upc": "75960620175400411",
                "diamondCode": "",
                "ean": "",
                "issn": "",
                "format": "Comic",
                "pageCount": 32,
                "textObjects": [],
                "resourceURI": "http://gateway.marvel.com/v1/public/comics/94962",
                "urls": [
                    {
                        "type": "detail",
                        "url": "http://marvel.com/comics/issue/94962/gambit_2022_4?utm_campaign=apiRef&utm_source=c56d1d73b83c9404918d14d1a390e039"
                    },
                    {
                        "type": "purchase",
                        "url": "http://comicstore.marvel.com/Gambit-4/digital-comic/60183?utm_campaign=apiRef&utm_source=c56d1d73b83c9404918d14d1a390e039"
                    }
                ],
                "series": {
                    "resourceURI": "http://gateway.marvel.com/v1/public/series/32346",
                    "name": "Gambit (2022 - Present)"
                },
                "variants": [],
                "collections": [],
                "collectedIssues": [],
                "dates": [
                    {
                        "type": "onsaleDate",
                        "date": "2022-10-12T00:00:00-0400"
                    },
                    {
                        "type": "focDate",
                        "date": "2022-09-12T00:00:00-0400"
                    }
                ],
                "prices": [
                    {
                        "type": "printPrice",
                        "price": 3.99
                    }
                ],
                "thumbnail": {
                    "path": "http://i.annihil.us/u/prod/marvel/i/mg/6/d0/628f83690d0bf",
                    "extension": "jpg"
                },
                "images": [
                    {
                        "path": "http://i.annihil.us/u/prod/marvel/i/mg/6/d0/628f83690d0bf",
                        "extension": "jpg"
                    }
                ],
                "creators": {
                    "available": 7,
                    "collectionURI": "http://gateway.marvel.com/v1/public/comics/94962/creators",
                    "items": [
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/creators/12313",
                            "name": "Mark Basso",
                            "role": "editor"
                        },
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/creators/44",
                            "name": "Chris Claremont",
                            "role": "writer"
                        },
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/creators/10172",
                            "name": "Vc Clayton Cowles",
                            "role": "letterer"
                        },
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/creators/13674",
                            "name": "Espen Grundetjern",
                            "role": "colorist"
                        },
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/creators/14066",
                            "name": "Sid Kotian",
                            "role": "inker"
                        },
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/creators/10824",
                            "name": "Whilce Portacio",
                            "role": "penciler (cover)"
                        },
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/creators/14265",
                            "name": "Alex Sinclair",
                            "role": "colorist (cover)"
                        }
                    ],
                    "returned": 7
                },
                "characters": {
                    "available": 0,
                    "collectionURI": "http://gateway.marvel.com/v1/public/comics/94962/characters",
                    "items": [],
                    "returned": 0
                },
                "stories": {
                    "available": 2,
                    "collectionURI": "http://gateway.marvel.com/v1/public/comics/94962/stories",
                    "items": [
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/stories/211052",
                            "name": "cover from Gambit (2029) #4",
                            "type": "cover"
                        },
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/stories/211053",
                            "name": "story from Gambit (2029) #4",
                            "type": "interiorStory"
                        }
                    ],
                    "returned": 2
                },
                "events": {
                    "available": 0,
                    "collectionURI": "http://gateway.marvel.com/v1/public/comics/94962/events",
                    "items": [],
                    "returned": 0
                }
            },
        ...
        ]
    }
}

```

## 7. GET /marvel/comics/:characterId'`
Description:
- Get detail character comics marvel from database marvel API

Request:

- Headers:

```json
{
  "characterId": "string",
}
```

_Response (200 - OK)_

```json
{
    "code": 200,
    "status": "Ok",
    "copyright": "© 2022 MARVEL",
    "attributionText": "Data provided by Marvel. © 2022 MARVEL",
    "attributionHTML": "<a href=\"http://marvel.com\">Data provided by Marvel. © 2022 MARVEL</a>",
    "etag": "8f1ec7454f3b4b529eb2785223ec7bb1c4aa3806",
    "data": {
        "offset": 0,
        "limit": 20,
        "total": 1,
        "count": 1,
        "results": [
            {
                "id": 102940,
                "digitalId": 0,
                "title": "Tomb Of Dracula Facsimile Edition (2022) #1",
                "issueNumber": 1,
                "variantDescription": "",
                "description": null,
                "modified": "2022-06-06T11:38:14-0400",
                "isbn": "",
                "upc": "75960620446500111",
                "diamondCode": "",
                "ean": "",
                "issn": "",
                "format": "Comic",
                "pageCount": 32,
                "textObjects": [],
                "resourceURI": "http://gateway.marvel.com/v1/public/comics/102940",
                "urls": [
                    {
                        "type": "detail",
                        "url": "http://marvel.com/comics/issue/102940/tomb_of_dracula_facsimile_edition_2022_1?utm_campaign=apiRef&utm_source=c56d1d73b83c9404918d14d1a390e039"
                    },
                    {
                        "type": "purchase",
                        "url": "http://comicstore.marvel.com/Tomb-Of-Dracula-Facsimile-Edition-1/digital-comic/59650?utm_campaign=apiRef&utm_source=c56d1d73b83c9404918d14d1a390e039"
                    }
                ],
                "series": {
                    "resourceURI": "http://gateway.marvel.com/v1/public/series/35505",
                    "name": "Tomb Of Dracula Facsimile Edition (2022)"
                },
                "variants": [],
                "collections": [],
                "collectedIssues": [],
                "dates": [
                    {
                        "type": "onsaleDate",
                        "date": "2022-10-05T00:00:00-0400"
                    },
                    {
                        "type": "focDate",
                        "date": "2022-09-05T00:00:00-0400"
                    }
                ],
                "prices": [
                    {
                        "type": "printPrice",
                        "price": 3.99
                    }
                ],
                "thumbnail": {
                    "path": "http://i.annihil.us/u/prod/marvel/i/mg/e/70/624f483548758",
                    "extension": "jpg"
                },
                "images": [
                    {
                        "path": "http://i.annihil.us/u/prod/marvel/i/mg/e/70/624f483548758",
                        "extension": "jpg"
                    }
                ],
                "creators": {
                    "available": 1,
                    "collectionURI": "http://gateway.marvel.com/v1/public/comics/102940/creators",
                    "items": [
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/creators/4430",
                            "name": "Jeff Youngquist",
                            "role": "editor"
                        }
                    ],
                    "returned": 1
                },
                "characters": {
                    "available": 1,
                    "collectionURI": "http://gateway.marvel.com/v1/public/comics/102940/characters",
                    "items": [
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/characters/1010677",
                            "name": "Dracula"
                        }
                    ],
                    "returned": 1
                },
                "stories": {
                    "available": 2,
                    "collectionURI": "http://gateway.marvel.com/v1/public/comics/102940/stories",
                    "items": [
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/stories/226983",
                            "name": "cover from Tomb of Dracula 1 Facsimile Edition (2022) #1",
                            "type": "cover"
                        },
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/stories/226984",
                            "name": "story from Tomb of Dracula 1 Facsimile Edition (2022) #1",
                            "type": "interiorStory"
                        }
                    ],
                    "returned": 2
                },
                "events": {
                    "available": 0,
                    "collectionURI": "http://gateway.marvel.com/v1/public/comics/102940/events",
                    "items": [],
                    "returned": 0
                }
            }
        ]
    }
}

```


## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
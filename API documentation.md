# News Portals API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /gsignin`
- `GET /weather`
- `GET /mountains`
- `GET /mountains/:id`
- `GET /licenses`
- `POST /licenses/:MountainId/:QuotaId`
- `PATCH /quota/:QuotaId`


&nbsp;

## 1. POST /register

Description:

- Create User

Request:

- body:

```json
{
  "email": "string",
  "name": "string",
  "password": "string",
  "phoneNumber": "string",
}
```

_Response (201 - Created)_

```json
{
    "id": 5,
    "name": "Ade Test",
    "email": "adetest@gmail.com"
}
```

_Response (400 - Bad Request)_

```json
{
  "email": "Email cannot be null"
}
OR
{
  "email": "Email cannot be empty"
}
OR
{
  "email": "Email must be unique"
}
OR
{
  "email": "Email must be format email"
}

{
    "password": "Password cannot be null"
}
OR
{
    "password": "Password cannot be empty"
}
OR
{
    "password": "Password length minimal 5"
}
```

_Response (500 - ISE)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 2. POST /login

Description:

- Authentication User

Request:

- body:

```json
{
  "email": "string",
  "password": "text"
}
```

_Response (200 - OK)_

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZGV0ZXN0QGdtYWlsLmNvbSIsIm5hbWUiOiJBZGUgVGVzdCIsImlhdCI6MTY1NTk0NDczNn0.YmoCp6JiGPVGf7I1iZhg6ZmK1MZ-m1hVohpHZKhZJu4"
}
```

_Response (400 - Bad Request)_

```json
{
  "email": "Email cannot be null"
}
OR
{
  "email": "Email cannot be empty"
}

{
  "password": "Password cannot be null"
}
OR
{
  "password": "Password cannot be empty"
}
```

_Response (500 - ISE)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 3. GET /weather

Description:

- Get all Weather from 3rd party API

_Response (201 - Created)_

```json
[
    {
        "name": "Gede Pangrango",
        "data": {
            "nama_kota": "Cianjur",
            "cuaca": {
                "cuaca_malam": "Hujan Ringan",
                "cuaca_dini_hari": "Berawan"
            },
            "suhu": "Berawan",
            "kelembapan": "20 - 30"
        }
    },
    {
        "name": "Merbabu",
        "data": {
            "nama_kota": "Magelang",
            "cuaca": {
                "cuaca_malam": "Hujan Ringan",
                "cuaca_dini_hari": "Hujan Ringan"
            },
            "suhu": "Berawan",
            "kelembapan": "23 - 31"
        }
    },
    {
        "name": "Slamet",
        "data": {
            "nama_kota": "Purwokerto",
            "cuaca": {
                "cuaca_malam": "Berawan",
                "cuaca_dini_hari": "Berawan Tebal"
            },
            "suhu": "Berawan",
            "kelembapan": "23 - 31"
        }
    },
    {
        "name": "Kerinci",
        "data": {
            "suhu": "Cerah Berawan",
            "kelembapan": "23°C"
        }
    },
    {
        "name": "Semeru",
        "data": {
            "nama_kota": "Kota Malang",
            "cuaca": {
                "cuaca_malam": "Cerah",
                "cuaca_dini_hari": "Cerah Berawan"
            },
            "suhu": "Cerah Berawan",
            "kelembapan": "19 - 30"
        }
    }
]
```

_Response (500 - Bad Request)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 4. GET /mountains

Description:

- Get all Mountain from database

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Gunung Gede Pangrango",
        "height": "3,008 mdpl",
        "imageUrl": "https://img.inews.co.id/media/822/files/inews_new/2022/04/10/10_hal_menarik_tentang_gunung_gede_pangrango.jpg",
        "description": "Gunung Gede-Pangrango merupakan dua gunung yang terdiri dari gunung Gede dan Gunung Pangrango. Walaupun seperti menyatu, ketinggian gunung Gede Pangrango berbeda. Ketinggian Gunung Gede adalah 2.958 m dpl (diatas permukaan laut). Sedangkan ketinggian gunung Pangrango adalah 3.019 m dpl. Kedua gunung ini dihubungkan oleh gigir gunung serupa sadel pada ketinggian +_ 2.400 m dpl, yang kita kenal saat ini sebagai daerah Kandang Badak. Gunung Pangrango yang lebih tinggi , memiliki puncak berbentuk kerucut yang relatif mulus. Ini menandakan tipe gunung yang usianya relatif masih muda dan belum pernah meletus. Untuk Gunung Gede walau ketinggiannya lebih rendah, namun masih aktif. Ini daapat kita lihat dari keberadaan kawah-kawah aktif antara lain Kawah Wadon, Kawah Ratu, Kawah Baru, dan Kawah Lanang.Titik puncak Gunung Gede terletak di atas tebing atau gigir kawah yang baru, namun gigir ini tak lagi utuh karena telah dihancurkan oleh letusan volkanik yang terjadi berulang kali. Gigir yang lebih tua adalah punggung gunung yang dikenal sebagai Gunung Gumuruh (2.929 m dpl); kawah-kawah dan puncak Gunung Gede yang sekarang terletak pada bekas kawah Gunung Gumuruh lama yang telah punah. Di antara gigir Gunung Gede dan gigir Gunung Gumuruh itulah terletak lembah dataran tinggi bernama Alun-alun Suryakancana (2.750 m dpl), yang penuh tertutupi oleh rumpun edelweis jawa yang cantik.",
        "licenseCost": 34000,
        "createdAt": "2022-06-21T19:58:22.211Z",
        "updatedAt": "2022-06-21T19:58:22.211Z"
    },
    {
        "id": 2,
        "name": "Gunung Merbabu",
        "height": "3,145 mdpl",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/12/MtmerbabuA45d.jpg",
        "description": "Gunung Merbabu adalah gunung tertinggi nomor tiga di Jawa Tengah setelah Gunung Slamet dan Gunung Sumbing. Gunung berketinggian 3.145 mdpl ini berada di tiga kabupaten di Jawa Tengah, yaitu Magelang, Boyolali, dan Semarang. Pintu masuk alias titik awal mendaki Gunung Merbabu juga bisa melalui tiga kabupaten ini. Ada lima jalur pendakian resmi yang dibuka untuk mendaki Gunung Merbabu. Yaitu jalur Selo-Boyolali, Suwanting-Magelang, Wekas-Magelang, Cuntel-Semarang, dan Thekelan-Semarang. Setiap jalur pendakian di Gunung Merbabu menyuguhkan tantangan dan lanskap yang berbeda-beda, tapi tetap memesona. Misalnya jalur Selo, Boyolali yang menjadi jalur paling favorit para pendaki karena memiliki padang sabana yang sangat luas.",
        "licenseCost": 225000,
        "createdAt": "2022-06-21T19:58:22.211Z",
        "updatedAt": "2022-06-21T19:58:22.211Z"
    },
    {
        "id": 3,
        "name": "Gunung Slamet",
        "height": "3,432 mdpl",
        "imageUrl": "https://asset.kompas.com/crops/mFdBEa8GySNDniLD7cudDsNhzJQ=/37x0:951x609/750x500/data/photo/2017/06/02/3529039154.jpg",
        "description": "Gunung Slamet merupakan gunung tertinggi di Jawa Tengah dan merupakan gunung tertinggi kedua di pulau Jawa, setelah gunung Semeru. Kawah IV merupakan kawah terakhir yang masih aktif sampai sekarang, dan terakhir aktif hingga pada level siaga medio-2009.Gunung Slamet cukup populer sebagai tujuan pendakian meskipun medannya dikenal sulit. Di kaki gunung ini terletak kawasan wisata Baturraden yang menjadi tujuan wisata di Kabupaten Banyumas, dengan jarak sekitar 15 km dari Kota Purwokerto. Selain itu terdapat wisata alam berupa pemandian air panas Guci yang berada di sisi utara Gunung Slamet, tepatnya di Kabupaten Tegal.",
        "licenseCost": 20000,
        "createdAt": "2022-06-21T19:58:22.211Z",
        "updatedAt": "2022-06-21T19:58:22.211Z"
    },
    {
        "id": 4,
        "name": "Gunung Kerinci",
        "height": "3,805 mdpl",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Uprising-mount_kerinci.jpg/280px-Uprising-mount_kerinci.jpg",
        "description": "Gunung Kerinci (juga dieja 'Kerintji', dan dikenal sebagai Gunung Gadang, Merapi) adalah gunung tertinggi di Sumatra, gunung berapi tertinggi di Indonesia, dan puncak tertinggi di Indonesia diluar Papua. Gunung Kerinci terletak di Kabupaten Kerinci, Provinsi Jambi, lebih tepatnya diperbatasan antara Provinsi Jambi dengan Provinsi Sumatera Barat, di Pegunungan Bukit Barisan, dekat pantai barat, dengan ketinggian 3.805 mdpl. Gunung ini juga menjadi batas antara wilayah Suku Kerinci dengan Etnis Minangkabau yang dikelilingi hutan lebat Taman Nasional Kerinci Seblat, merupakan habitat harimau sumatra dan badak sumatra.Gunung Kerinci merupakan gunung berapi bertipe stratovulcano yang masih aktif dan terakhir kali meletus pada tahun 2009. Pada puncak Gunung Kerinci, dapat melihat dikejauhan membentang pemandangan indah Kota Jambi, Padang, dan Bengkulu. Bahkan Samudera Hindia yang luas dapat terlihat dengan jelas. Gunung Kerinci memiliki kawah seluas 400 x 120 meter dan berisi air yang berwarna hijau. Di sebelah timur terdapat Rawa Bento, rawa berair jernih tertinggi di Sumatra. Di belakangnya terdapat Gunung Tujuh dengan kawah yang hampir tak tersentuh.",
        "licenseCost": 7500,
        "createdAt": "2022-06-21T19:58:22.211Z",
        "updatedAt": "2022-06-21T19:58:22.211Z"
    },
    {
        "id": 5,
        "name": "Gunung Semeru",
        "height": "3,676 mdpl",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Semeru.jpg/280px-Semeru.jpg",
        "description": "Gunung Semeru atau Gunung Meru adalah sebuah gunung berapi kerucut di Jawa Timur, Indonesia. Gunung Semeru merupakan gunung tertinggi di Pulau Jawa, dengan puncaknya Mahameru, 3.676 meter dari permukaan laut (mdpl). Gunung ini terbentuk akibat subduksi Lempeng Indo-Australia kebawah Lempeng Eurasia. Gunung Semeru juga merupakan gunung berapi tertinggi ketiga di Indonesia setelah Gunung Kerinci di Sumatra dan Gunung Rinjani di Nusa Tenggara Barat. Kawah di puncak Gunung Semeru dikenal dengan nama Jonggring Saloko. Gunung Semeru secara administratif termasuk dalam wilayah dua kabupaten, yakni Kabupaten Malang dan Kabupaten Lumajang, Provinsi Jawa Timur. Gunung ini termasuk dalam kawasan Taman Nasional Bromo Tengger Semeru. Semeru mempunyai kawasan hutan Dipterokarp Bukit, hutan Dipterokarp Atas, hutan Montane, dan Hutan Ericaceous atau hutan gunung. Posisi geografis Semeru terletak antara 8°06' LS dan 112°55' BT. Pada tahun 1913 dan 1946 Kawah Jonggring Saloka memiliki kubah dengan ketinggian 3.744,8 m hingga akhir November 1973. Di sebelah selatan, kubah ini mendobrak tepi kawah menyebabkan aliran lava mengarah ke sisi selatan meliputi daerah Pronojiwo dan Candipuro di Lumajang.",
        "licenseCost": 24000,
        "createdAt": "2022-06-21T19:58:22.211Z",
        "updatedAt": "2022-06-21T19:58:22.211Z"
    }
]
```

_Response (500 - Bad Request)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 5. GET /mountains/:id

Description:

- Get Mountain by Id

Request:

- params:

```json
{
  "MountainId": "integer"
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "name": "Gunung Gede Pangrango",
    "height": "3,008 mdpl",
    "imageUrl": "https://img.inews.co.id/media/822/files/inews_new/2022/04/10/10_hal_menarik_tentang_gunung_gede_pangrango.jpg",
    "description": "Gunung Gede-Pangrango merupakan dua gunung yang terdiri dari gunung Gede dan Gunung Pangrango. Walaupun seperti menyatu, ketinggian gunung Gede Pangrango berbeda. Ketinggian Gunung Gede adalah 2.958 m dpl (diatas permukaan laut). Sedangkan ketinggian gunung Pangrango adalah 3.019 m dpl. Kedua gunung ini dihubungkan oleh gigir gunung serupa sadel pada ketinggian +_ 2.400 m dpl, yang kita kenal saat ini sebagai daerah Kandang Badak. Gunung Pangrango yang lebih tinggi , memiliki puncak berbentuk kerucut yang relatif mulus. Ini menandakan tipe gunung yang usianya relatif masih muda dan belum pernah meletus. Untuk Gunung Gede walau ketinggiannya lebih rendah, namun masih aktif. Ini daapat kita lihat dari keberadaan kawah-kawah aktif antara lain Kawah Wadon, Kawah Ratu, Kawah Baru, dan Kawah Lanang.Titik puncak Gunung Gede terletak di atas tebing atau gigir kawah yang baru, namun gigir ini tak lagi utuh karena telah dihancurkan oleh letusan volkanik yang terjadi berulang kali. Gigir yang lebih tua adalah punggung gunung yang dikenal sebagai Gunung Gumuruh (2.929 m dpl); kawah-kawah dan puncak Gunung Gede yang sekarang terletak pada bekas kawah Gunung Gumuruh lama yang telah punah. Di antara gigir Gunung Gede dan gigir Gunung Gumuruh itulah terletak lembah dataran tinggi bernama Alun-alun Suryakancana (2.750 m dpl), yang penuh tertutupi oleh rumpun edelweis jawa yang cantik.",
    "licenseCost": 34000,
    "createdAt": "2022-06-21T19:58:22.211Z",
    "updatedAt": "2022-06-21T19:58:22.211Z",
    "Quota": [
        {
            "id": 5,
            "MountainId": 1,
            "date": "2022-06-27T00:00:00.000Z",
            "quotaUse": 18,
            "quotaMax": 20,
            "createdAt": "2022-06-21T19:58:22.224Z",
            "updatedAt": "2022-06-21T19:58:22.224Z"
        },
        {
            "id": 1,
            "MountainId": 1,
            "date": "2022-06-23T00:00:00.000Z",
            "quotaUse": 160,
            "quotaMax": 20,
            "createdAt": "2022-06-21T19:58:22.224Z",
            "updatedAt": "2022-06-21T21:36:39.584Z"
        },
        {
            "id": 2,
            "MountainId": 1,
            "date": "2022-06-24T00:00:00.000Z",
            "quotaUse": 15,
            "quotaMax": 20,
            "createdAt": "2022-06-21T19:58:22.224Z",
            "updatedAt": "2022-06-21T21:37:32.776Z"
        },
        {
            "id": 3,
            "MountainId": 1,
            "date": "2022-06-25T00:00:00.000Z",
            "quotaUse": 11,
            "quotaMax": 20,
            "createdAt": "2022-06-21T19:58:22.224Z",
            "updatedAt": "2022-06-22T22:42:01.149Z"
        },
        {
            "id": 4,
            "MountainId": 1,
            "date": "2022-06-26T00:00:00.000Z",
            "quotaUse": 20,
            "quotaMax": 20,
            "createdAt": "2022-06-21T19:58:22.224Z",
            "updatedAt": "2022-06-22T23:51:05.258Z"
        }
    ]
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Mountain not found"
}
```

_Response (500 - Bad Request)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 6. GET /licenses

Description:

- Get License from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```
- user:

```json
{
    "UserId": "integer"
}
```

- params:

```json
{
  "idNews": "integer (required)"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 18,
        "UserId": 2,
        "MountainId": 4,
        "QuotaId": 18,
        "numberOfClimbers": 5,
        "totalPrice": 37500,
        "status": "Waiting For Payment",
        "createdAt": "2022-06-22T23:50:31.600Z",
        "updatedAt": "2022-06-22T23:50:31.600Z",
        "Mountain": {
            "id": 4,
            "name": "Gunung Kerinci",
            "height": "3,805 mdpl",
            "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Uprising-mount_kerinci.jpg/280px-Uprising-mount_kerinci.jpg",
            "description": "Gunung Kerinci (juga dieja 'Kerintji', dan dikenal sebagai Gunung Gadang, Merapi) adalah gunung tertinggi di Sumatra, gunung berapi tertinggi di Indonesia, dan puncak tertinggi di Indonesia diluar Papua. Gunung Kerinci terletak di Kabupaten Kerinci, Provinsi Jambi, lebih tepatnya diperbatasan antara Provinsi Jambi dengan Provinsi Sumatera Barat, di Pegunungan Bukit Barisan, dekat pantai barat, dengan ketinggian 3.805 mdpl. Gunung ini juga menjadi batas antara wilayah Suku Kerinci dengan Etnis Minangkabau yang dikelilingi hutan lebat Taman Nasional Kerinci Seblat, merupakan habitat harimau sumatra dan badak sumatra.Gunung Kerinci merupakan gunung berapi bertipe stratovulcano yang masih aktif dan terakhir kali meletus pada tahun 2009. Pada puncak Gunung Kerinci, dapat melihat dikejauhan membentang pemandangan indah Kota Jambi, Padang, dan Bengkulu. Bahkan Samudera Hindia yang luas dapat terlihat dengan jelas. Gunung Kerinci memiliki kawah seluas 400 x 120 meter dan berisi air yang berwarna hijau. Di sebelah timur terdapat Rawa Bento, rawa berair jernih tertinggi di Sumatra. Di belakangnya terdapat Gunung Tujuh dengan kawah yang hampir tak tersentuh.",
            "licenseCost": 7500,
            "createdAt": "2022-06-21T19:58:22.211Z",
            "updatedAt": "2022-06-21T19:58:22.211Z"
        },
        "Quotum": {
            "id": 18,
            "MountainId": 4,
            "date": "2022-06-25T00:00:00.000Z",
            "quotaUse": 10,
            "quotaMax": 10,
            "createdAt": "2022-06-21T19:58:22.224Z",
            "updatedAt": "2022-06-22T23:50:31.638Z"
        },
        "User": {
            "id": 2,
            "email": "nandia@gmail.com",
            "name": "Nandia Z. C.",
            "password": "$2a$10$IASs838V.yipz5pPO3EaiOzSqMallYy72rFDV7umTvdczpLdiRWQ.",
            "phoneNumber": "089898989",
            "createdAt": "2022-06-21T19:58:22.120Z",
            "updatedAt": "2022-06-21T19:58:22.120Z"
        }
    },
    {
        "id": 19,
        "UserId": 2,
        "MountainId": 1,
        "QuotaId": 4,
        "numberOfClimbers": 15,
        "totalPrice": 510000,
        "status": "Waiting For Payment",
        "createdAt": "2022-06-22T23:51:05.233Z",
        "updatedAt": "2022-06-22T23:51:05.233Z",
        "Mountain": {
            "id": 1,
            "name": "Gunung Gede Pangrango",
            "height": "3,008 mdpl",
            "imageUrl": "https://img.inews.co.id/media/822/files/inews_new/2022/04/10/10_hal_menarik_tentang_gunung_gede_pangrango.jpg",
            "description": "Gunung Gede-Pangrango merupakan dua gunung yang terdiri dari gunung Gede dan Gunung Pangrango. Walaupun seperti menyatu, ketinggian gunung Gede Pangrango berbeda. Ketinggian Gunung Gede adalah 2.958 m dpl (diatas permukaan laut). Sedangkan ketinggian gunung Pangrango adalah 3.019 m dpl. Kedua gunung ini dihubungkan oleh gigir gunung serupa sadel pada ketinggian +_ 2.400 m dpl, yang kita kenal saat ini sebagai daerah Kandang Badak. Gunung Pangrango yang lebih tinggi , memiliki puncak berbentuk kerucut yang relatif mulus. Ini menandakan tipe gunung yang usianya relatif masih muda dan belum pernah meletus. Untuk Gunung Gede walau ketinggiannya lebih rendah, namun masih aktif. Ini daapat kita lihat dari keberadaan kawah-kawah aktif antara lain Kawah Wadon, Kawah Ratu, Kawah Baru, dan Kawah Lanang.Titik puncak Gunung Gede terletak di atas tebing atau gigir kawah yang baru, namun gigir ini tak lagi utuh karena telah dihancurkan oleh letusan volkanik yang terjadi berulang kali. Gigir yang lebih tua adalah punggung gunung yang dikenal sebagai Gunung Gumuruh (2.929 m dpl); kawah-kawah dan puncak Gunung Gede yang sekarang terletak pada bekas kawah Gunung Gumuruh lama yang telah punah. Di antara gigir Gunung Gede dan gigir Gunung Gumuruh itulah terletak lembah dataran tinggi bernama Alun-alun Suryakancana (2.750 m dpl), yang penuh tertutupi oleh rumpun edelweis jawa yang cantik.",
            "licenseCost": 34000,
            "createdAt": "2022-06-21T19:58:22.211Z",
            "updatedAt": "2022-06-21T19:58:22.211Z"
        },
        "Quotum": {
            "id": 4,
            "MountainId": 1,
            "date": "2022-06-26T00:00:00.000Z",
            "quotaUse": 20,
            "quotaMax": 20,
            "createdAt": "2022-06-21T19:58:22.224Z",
            "updatedAt": "2022-06-22T23:51:05.258Z"
        },
        "User": {
            "id": 2,
            "email": "nandia@gmail.com",
            "name": "Nandia Z. C.",
            "password": "$2a$10$IASs838V.yipz5pPO3EaiOzSqMallYy72rFDV7umTvdczpLdiRWQ.",
            "phoneNumber": "089898989",
            "createdAt": "2022-06-21T19:58:22.120Z",
            "updatedAt": "2022-06-21T19:58:22.120Z"
        }
    }
]
```



_Response (500 - Bad Request)_

```json
{
  "message": "Internal Server Error"
}
```


_Response (401 - Unauthorized)_

```json
{
  "message": "Access Token is Invalid"
}
```

&nbsp;

## 7. POST /licenses/:MountainId/:QuotaId

Description:

- Post License

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
  "MountainId": "integer (required)",
  "QuotaId": "integer (required)"
}
```

- user:

```json
{
  "UserId": "string"
}
```

_Response (200 - OK)_

```json
{ "message": "Success Created License" }
```

_Response (404 - Not Found)_

```json
{
  "message": "Mountain not found"
}
```

_Response (500 - Bad Request)_

```json
{
  "message": "Internal Server Error"
}
```


_Response (401 - Unauthorized)_

```json
{
  "message": "Access Token is Invalid"
}
```

&nbsp;

## 8. PATCH /quota/:QuotaId

Description:

- Patch quota from database

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
  "QuotaId": "integer (required)"
}
```

- body:

```json
{
  "quotaUse": "integer (required)"
}
```

_Response (200 - OK)_

```json
{ "message": "QuotaUse has been updated" }
```

_Response (404 - Not Found)_

```json
{
  "message": "Mountain not found"
}
```

_Response (500 - Bad Request)_

```json
{
  "message": "Internal Server Error"
}
```


_Response (401 - Unauthorized)_

```json
{
  "message": "Access Token is Invalid"
}
```

&nbsp;

## 9. POST /gsignin

Request:

- headers:

```json
{
  "credential": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "email": "string",
  "role": "string"
}
```

_Response (201 - Created)_

```json
{
  "access_token": "string",
  "email": "string",
  "role": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Access Token is Invalid"
}
```

_Response (500 - ISE)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;


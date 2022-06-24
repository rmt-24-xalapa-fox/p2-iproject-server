# p2-iproject-server
Individual Project - Server - InstaVue

Avaliable Endpoint for public:
GET '/post'
GET '/post/:id'
POST '/users/login'
POST '/users/loginGoogle'
POST '/users/register'
POST '/users/registerAdmin'

Require Authentication
GET '/mypost'
POST '/post'
POST '/post/:id/comments'
GET '/favourite'

POST '/favourite/:id'
DELETE '/favourite/:id'

POST '/users/coinPrice'
POST '/users/getInvoices'
POST '/users/getLink/:id'
POST '/users/buyCoin/:id'
POST '/users/giftCoin/:id'

Require Authorization
PATCH '/post/:id'

POST '/users/addPrice'
POST '/promotePost/:id'
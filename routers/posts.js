
const express = require('express')
const router = express.Router();
const Controller= require('../controllers/movie')
const {authorization,authorizationUser} = require("../middlewares/auth");
const {authentication} = require("../middlewares/auth");

router.get('/post', Controller.getMovies)
router.get('/post/:id', Controller.getMovieDetail)

router.use(authentication);
router.post('/post/:id/addComment', Controller.addMovie)
router.get('/favourite', Controller.listFavourite)

router.post('/favourite/:id', Controller.addFavourite)
router.delete('/favourite/:id',authorizationUser, Controller.deleteFavourite)

router.get('/following', Controller.deleteFavourite)
router.post('/follow/:id', Controller.deleteFavourite)
router.delete('/follow/:id',authorizationUser, Controller.deleteFavourite)

router.patch('/post/:id',authorization, Controller.deleteMovie)

module.exports=router;
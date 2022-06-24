
const express = require('express')
const router = express.Router();
const PostController= require('../controllers/PostController')
const {authorization,authorizationUser,loginOrNot} = require("../middlewares/auth");
const {authentication} = require("../middlewares/auth");

router.get('/post', PostController.getPosts)
router.get('/post/:id', loginOrNot,PostController.getPostDetail)

router.use(authentication);
router.get('/mypost', PostController.getMyPosts)
// router.get('/mypost/:id', PostController.getOtherPosts)
router.post('/post', PostController.addPost)
router.post('/post/:id/comments', PostController.addComment)
router.get('/favourite', PostController.getFavourites)

router.post('/favourite/:id', PostController.addFavourite)
router.delete('/favourite/:id', PostController.unfavourited)

router.patch('/post/:id', PostController.updatePosts)
router.post('/promotePost/:id', PostController.promotePost)


module.exports=router;

const express = require('express')
const router = express.Router();
const UserController= require('../controllers/user')

router.get('/chat',UserController.getChatRoom)
router.post('/chat',UserController.addChatRoom)

router.get('/chat/:id',UserController.getChatList)
router.post('/chat/:id',UserController.joinChatRoom)
router.post('/chat/:id/comment',UserController.commentToChatRoom)
router.delete('/chat/:id',UserController.leaveChatRoom)

module.exports=router;
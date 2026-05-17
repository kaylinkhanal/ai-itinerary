const express = require('express')
const bcrypt = require('bcryptjs')
const { default: User } = require('../models/user')
const { registerNewUser, loginUser, getAllUsers, getUserDetailsById, addNewChatByUserId ,getAllChatsByUserId ,deleteChatsByUserId,getChatsByConversationId} = require('../controller/user')
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, 'uploads')
   },
   filename: function (req, file, cb) {
     cb(null, Math.random()  + file.originalname  )
   }
 })
 
 const upload = multer({ storage: storage })



router.post('/register', upload.single('avatar'),  registerNewUser)
router.post('/login', loginUser)

const verifyUser= (req, res, next)=> {
   if(req.headers?.authorization){
    next()
   }else{
    res.status(401).send('Unauthorized')
   }
}
router.get('/users', verifyUser, getAllUsers)
router.get('/users/:id', getUserDetailsById)
router.post('/newchat', addNewChatByUserId)
router.get('/chats', getAllChatsByUserId)
router.delete('/chats/:id', deleteChatsByUserId)
router.get('/chats/:id', getChatsByConversationId)
module.exports = router
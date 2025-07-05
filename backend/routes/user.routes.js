const express=require('express')
const router=express.Router()
const UserContoller=require('../controllers/UserController')
const AuthMiddleware=require('../middleware/auth.middleware')
router.post('/signup',UserContoller.signup)
router.post('/login',UserContoller.login)
router.get('/profile',AuthMiddleware.auth,UserContoller.getProfile)
module.exports=router
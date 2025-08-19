const express=require('express');
const router=express.Router();
const userController=require('../controller/user.controller');
const authMiddleware=require('../middleware/auth.middleware');
const {body}=require('express-validator');

router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('fullname.firstname').notEmpty().withMessage('First name is required'),
], userController.register);

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').notEmpty().withMessage('Password is required'),
], userController.login);

router.get('/profile', authMiddleware.isAuth, userController.getProfile);

router.post('/logout', authMiddleware.isAuth, userController.logout);

module.exports=router;
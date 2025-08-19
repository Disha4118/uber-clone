const express=require('express');
const router=express.Router();
const userController=require('../controller/user.controller');
const {body}=require('express-validator');

router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('fullname.firstname').notEmpty().withMessage('First name is required'),
], userController.register);

module.exports=router;
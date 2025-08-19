const userSchema=require('../models/user.model');
const userService = require('../service/user.service');
const {validationResult}=require('express-validator');

module.exports.register=async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {fullname, email, password}=req.body;
    const hashedpassword=await userSchema.hashPassword(password);
    const user = await userService.createUser({firstname: fullname.firstname, lastname: fullname.lastname, email, password: hashedpassword});
    const token = user.generateAuthToken();
    return res.status(201).json({ user, token });
}
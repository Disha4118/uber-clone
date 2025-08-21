const userSchema=require('../models/user.model');
const userService=require('../service/user.service');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const blacklistTokenSchema=require('../models/blacklistToken.model');
const CaptainModel=require('../models/captain.model.js');

module.exports.isAuth=async(req, res, next) => {
    const token=req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token) {
        return res.status(401).json({message:"No token provided"});
    }
    const isBlacklisted = await blacklistTokenSchema.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: "Token is blacklisted" });
    }
    try {
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user=await userSchema.findById(decoded._id);
        return next();
    } catch (error) {
        return res.status(401).json({message:"Invalid token", error: error.message});
    }
};
module.exports.isCaptainAuth=async(req, res, next) => {
    const token=req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token) {
        return res.status(401).json({message:"No token provided"});
    }
    const isBlacklisted = await blacklistTokenSchema.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: "Token is blacklisted" });
    }
    try {
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.captain=await CaptainModel.findById(decoded._id);
        return next();
    } catch (error) {
        return res.status(401).json({message:"Invalid token", error: error.message});
    }
};

import userSchema from '../models/user.model.js';
import userService from '../service/user.service.js';
import { validationResult } from 'express-validator';
import blacklistTokenModel from '../models/blacklistToken.model.js';

export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password } = req.body;
    const hashedpassword = await userSchema.hashPassword(password);
    const user = await userService.createUser({ firstname: fullname.firstname, lastname: fullname.lastname, email, password: hashedpassword });
    const token = user.generateAuthToken();
    return res.status(201).json({ user, token });
};

export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email: email });
    if (!user) {
        return res.status(401).json({ message: "user not found" });
    }
    const isMatch = await user.comparePassword(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
    }
    const token = user.generateAuthToken();
    res.cookie("token", token, {
        httpOnly: true,  
        secure: false,    
        sameSite: "strict"
    });
    return res.status(200).json({ user, token });
};

export const getProfile = async (req, res) => {
    const user = req.user;
    console.log(req.user);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
};

export const logout = async (req, res) => {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    await blacklistTokenModel.create({ token });
    return res.status(200).json({ message: "Logged out successfully" });
};

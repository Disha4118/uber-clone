import userSchema from '../models/user.model.js';
import userService from '../service/user.service.js';
import { validationResult } from 'express-validator';

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
    return res.status(200).json({ user, token });
};
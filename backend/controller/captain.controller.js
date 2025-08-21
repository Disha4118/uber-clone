const blacklistTokenModel = require('../models/blacklistToken.model.js');
const CaptainModel=require('../models/captain.model.js');
const CaptainService=require('../service/captain.service.js');
const { validationResult } = require('express-validator');

module.exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password, vehicle } = req.body;
    const IsCaptainExists = await CaptainModel.findOne({ email });
    if (IsCaptainExists) {
        return res.status(400).json({ error: 'Captain already exists' });
    }

    const hashedPassword = await CaptainModel.hashPassword(password);
    const captain = await CaptainService.registerCaptain({
        fullname,
        email,
        password: hashedPassword,
        vehicle
    });
    const token = captain.generateAuthToken();
    res.status(201).json({ captain, token });

};
module.exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const captain = await CaptainModel.findOne({ email });
    if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = captain.generateAuthToken();
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict"
    });
    res.status(200).json({ captain, token });
};
module.exports.getProfile = async (req, res) => {
    const captain = req.captain;
    console.log("Captain is: ", captain);
    if (!captain) {
        return res.status(404).json({ message: 'Captain not found'});
    }
    res.status(200).json({ captain });
};

module.exports.logout = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await blacklistTokenModel.create({ token });
    res.clearCookie("token");
    res.status(200).json({ message: 'Logged out successfully' });
};

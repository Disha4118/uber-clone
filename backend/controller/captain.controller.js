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

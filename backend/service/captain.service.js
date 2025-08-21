const CaptainModel=require('../models/captain.model.js');

const registerCaptain = async (captainData) => {
    // Validate required nested fields
    if (!captainData.fullname?.firstname || !captainData.fullname?.lastname || !captainData.email || !captainData.password
        || !captainData.vehicle?.color || !captainData.vehicle?.plate || !captainData.vehicle?.capacity || !captainData.vehicle?.vehicleType) {
        throw new Error('Missing required fields');
    }
    try {
        const captain = new CaptainModel(captainData);
        await captain.save();
        return captain;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    registerCaptain
};

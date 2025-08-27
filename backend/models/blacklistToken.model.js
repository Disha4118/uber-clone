const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 1 day
    }
});

// Agar model pehle se exist kare to use karo, warna naya banao
module.exports = mongoose.models.BlacklistToken || mongoose.model('BlacklistToken', blacklistTokenSchema);

const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const captainSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true
        },
        lastname:{
            type: String
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password:{
        type: String,
        required: true
    },
    socketId:{
        type: String
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    vehicle:{
        color:{
            type: String,
            required: true
        },
        plate:{
            type: String,
            required: true
        },
        capacity:{
            type: Number,
            required: true,
            minlength: 1
        },
        vehicleType:{
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto']
        }
    },
    location:{
        lat:{
            type: Number
        },
        lng:{
            type: Number
        }
    }
});
captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};
captainSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};
captainSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

const CaptainModel = mongoose.model('Captain', captainSchema);
module.exports = CaptainModel;

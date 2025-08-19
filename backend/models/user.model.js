const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const userSchema=new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [2, 'First name must be at least 2 characters long']
        },
        lastname: {
            type: String,
            minlength: [2, 'Last name must be at least 2 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    socketID: {
        type: String
    }
});
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};
userSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};
userSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
};
const User=mongoose.model('user',userSchema);
module.exports=User;

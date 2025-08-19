const userSchema=require('../models/user.model');

module.exports.createUser=async({firstname, lastname, password, email})=>{
    if(!firstname || !lastname || !password || !email) {
        throw new Error('All fields are required');
    }
        const user = new userSchema({
            fullname: {
                firstname,
                lastname
            },
            email,
            password
        });
        await user.save();
        return user;
}

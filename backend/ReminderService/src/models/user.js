const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SALT, JWT_SECRET } = require('../config/serverConfig');

const userSchema = new mongoose.Schema({
    email : {
        type : String , 
        required : true
    } , 
    password : {
        type : String , 
        required : true
    }
});

userSchema.pre("save" , function (next) {
    const user = this;
    const encryptedPassword = bcrypt.hashSync(user.password , SALT);
    user.password = encryptedPassword;
    next();
})

userSchema.methods.generateToken = function () {
    const token = jwt.sign({id : this._id} , JWT_SECRET , {
        expiresIn : '1d'
    });
    return token;
}

userSchema.methods.comparePassword = function (enteredPassword) {
    return bcrypt.compareSync(enteredPassword , this.password);
}
const User = mongoose.model('User' , userSchema);

module.exports = User;

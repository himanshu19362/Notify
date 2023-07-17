const { passwordStrength } = require('check-password-strength')
const validator = require("email-validator");

const User = require('./../models/user');

const signup = async (email , password) => {
    try {
        const strength = passwordStrength(password).value;
        if(strength !== "Strong"){
            throw new Error('Password is weak');
        }
        if(!validator.validate(email)){
            throw new Error('Enter a valid email')
        }
        const user = await User.create({email , password});
        return user;
    } catch (error) {
        throw error; 
    }
}

const login = async (email , password) => {
    try {
        const user = await User.findOne({email});
        if(!user){
            throw new Error("User with this email doesnot exist");
        }
        if(!user.comparePassword(password)){
            throw new Error("Wrong password entered");
        }
        const token = user.generateToken();
        return token;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    signup , login
}

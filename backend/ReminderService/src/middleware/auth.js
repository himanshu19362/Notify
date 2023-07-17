const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/serverConfig');
const User = require('./../models/user');
const { StatusCodes } = require('http-status-codes');

const isAuthenticated = async(req , res , next) => {
    try {
        if(req.cookies && req.cookies.utoken){
            const token = req.cookies.utoken;
            const { id } = jwt.verify(token , JWT_SECRET);
            const user = await User.findById(id).select("-password");
            req.user = user;
            next();
        }      
        else{
            return res.status(StatusCodes.UNAUTHORIZED).json({
                status : false , 
                message : error.message ? error.message : "Authorization failed" ,
                err : error
            })
        } 
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            status : false , 
            message : error.message ? error.message : "Authorization failed" ,
            err : error
        })
    }

}

module.exports = {
    isAuthenticated
}
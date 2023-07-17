const UserService = require('./../services/user');
const { StatusCodes } = require('http-status-codes');

const signup = async(req , res) => {
    try {
        const { email , password } = req.body
        const user = await UserService.signup(email , password );
        return res.status(StatusCodes.CREATED).json({
            status : true , 
            message : "User created successfully" ,
            user
        })
    } catch (error) {
        console.log(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status : false , 
            message : error.message ? error.message : 'User not created' ,
            err : error
        })
    }
}

const login = async(req , res) => {
    try {
        const { email , password } = req.body;
        const token = await UserService.login(email , password);
        return res.status(StatusCodes.OK).cookie('utoken' , token , { expires : new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) , httpOnly: true , secure : false , sameSite: "none"}).json({
            status : true , 
            message : "Login Successful" ,
        })
    } catch (error) {
        console.log(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status : false , 
            message : error.message ? error.message : 'Login failed' ,
            err : error
        })
    }
}

const logout = (req , res) => {
    return res.status(StatusCodes.OK).clearCookie('utoken').json({
        status : true , 
        message : 'Logged out successfully'
    })
}

module.exports = {
    signup , login , logout
}
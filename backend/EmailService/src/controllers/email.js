const EmailService = require('./../services/email');
const { StatusCodes } = require('http-status-codes')

const sendReminder = async (req , res) => {
    try {
        const { email , message } = req.body;
        await EmailService.sendReminder(email , message);
        return res.status(StatusCodes.OK).json({
            status : true , 
            message : "Email sent successfully"
        })
        
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status : false , 
            message : "Email not sent"
        })
    }
}

module.exports = {
    sendReminder
}
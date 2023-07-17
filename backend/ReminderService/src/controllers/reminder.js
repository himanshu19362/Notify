const { StatusCodes } = require('http-status-codes');
const ReminderService = require('./../services/reminder');

const createReminder = async (req , res) => {
    try {
        const { message , time } = req.body;
        const reminder = await ReminderService.createReminder(message , req.user.id , time);
        return res.status(StatusCodes.CREATED).json({
            status : true , 
            message : "Reminder created" , 
            reminder
        })

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status : false , 
            message : error.message ? error.message : "Reminder not created"
        })
    }
}

const getReminder = async (req , res) => {
    try {
        const userId = req.user.id;
        const reminders = await ReminderService.getReminder(userId);
        return res.status(StatusCodes.OK).json({
            status : true , 
            message : "Reminders fetched successfully" , 
            reminders
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status : false , 
            message : "Reminders not fetched" , 
            err : error
        })
    }
}

const deleteReminder = async (req , res) => {
    try {
        const id = req.params.id;
        console.log(id);
        await ReminderService.deleteReminder(id);
        return res.status(StatusCodes.OK).json({
            status : true , 
            message : "Reminder deleted successfully"
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status : false , 
            message : "Reminder not deleted "
        })
    }
}

module.exports = {
    createReminder , getReminder , deleteReminder
}
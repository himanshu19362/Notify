const cron = require('node-cron');
const ReminderService = require('./../services/reminder');
const User = require('../models/user');
const { createChannel , publishMessage} = require('./messageQueue');
const { BINDING_KEY } = require('../config/serverConfig');
const sendReminders = async (channel) => {
    cron.schedule('* * * * *' , async () => {
        try {
            const reminders = await ReminderService.getCurrentReminders();
            reminders.map(async reminder => {
                const message = reminder.message;
                const user = await User.findById(reminder.userId);
                const email = user.email;
                publishMessage(channel , BINDING_KEY , JSON.stringify({message , email}));
            })    
        } catch (error) {
            console.log("Cron not working.")
            if(error.message)   console.log(error.message);
        }        
    });
}

module.exports = {
    sendReminders
}

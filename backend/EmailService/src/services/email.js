const sender = require("../config/emailConfig")

const sendReminder = async (email , message) => {
    try {
        const mail = await sender.sendMail({
            to : email , 
            subject : "Reminder" , 
            text : message
        });
        console.log(mail.messageId);
    } catch (error) {
        console.log(error.message ? error.message : 'Error')
        throw error;
    }
}

module.exports = {
    sendReminder
}
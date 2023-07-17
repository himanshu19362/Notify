const User = require('./../models/user');
const Reminder = require('./../models/reminder');

const createReminder = async (message , userId , time) => {
    const user = await User.findById(userId);
    if(!user){
        throw new Error("User doesnot exist");
    }

    if(!message){
        throw new Error("Message cannot be empty");
    }
    if(!time){
        throw new Error("Date cannot be empty");
    }

    time = new Date(time);

    if(time < new Date()){
        throw new Error("Time already gone");
    }

    const reminder = await Reminder.create({userId , message , time});
    return reminder;
}

const getReminder = async ( userId ) => {
    try {
        const options = {
            userId,
            time : {$gt : new Date()}
        }
        const reminders = await Reminder.find(options).sort({time : 1});
        return reminders;
    } catch (error) {
        throw error;
    }
}

const deleteReminder = async (id) => {
    try {
        await Reminder.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
}

const getCurrentReminders = async () => {
    const currTime = new Date();
    let reminders = await Reminder.find({});
    reminders = reminders.filter(reminder => (
        reminder.time.getDate() === currTime.getDate() && 
        reminder.time.getMonth() === currTime.getMonth()) && 
        reminder.time.getFullYear() === currTime.getFullYear() && 
        reminder.time.getHours() === currTime.getHours() && 
        reminder.time.getMinutes() === currTime.getMinutes()        
    )

    return reminders;
}

module.exports = {
    createReminder , getReminder , deleteReminder , getCurrentReminders
}
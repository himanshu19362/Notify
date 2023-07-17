const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'User'
    } , 
    message : {
        type : String , 
        required : true
    } , 
    time : {
        type : Date , 
        required : true
    }
});

const Reminder = mongoose.model('Reminder' , reminderSchema);

module.exports = Reminder;
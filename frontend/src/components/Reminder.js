import React from 'react';
import './../styles/Reminder.css';
import axios from 'axios';

const Reminder = ({message , time , id , fetchReminders}) => {
  const deleteReminder = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/reminder/${id}` , {
        headers : {
          "Content-Type" : "application/json" , 
          "Access-Control-Allow-Origin" : "*"
        } , 
        withCredentials : true
      });
      await fetchReminders()
    } catch (error) {
      
    }
    
  }
  return (
    <div className='reminder'>
        <p className='reminder-time'><strong>Scheduled Time : </strong>{time.getDate() < 10 ? "0" : ""}{time.getDate()} - {time.getMonth() < 10 ? "0" : ""}{time.getMonth()} - {time.getFullYear()} | {time.getHours()%12}:{time.getMinutes()} {(time.getHours()/2) === 1 ? "PM" : "AM"}</p>
        <hr />
        <p>{message}</p>
        <button onClick={deleteReminder}>Delete</button>
    </div>
  )
}

export default Reminder
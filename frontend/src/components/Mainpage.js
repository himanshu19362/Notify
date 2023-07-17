import React, { useEffect, useState } from 'react'
import './../styles/Mainpage.css';
import Reminder from './Reminder';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Mainpage = () => {
  const [date , setDate] = useState('');
  const [time , setTime] = useState('');
  const [reminders , setReminders] = useState([]);
  const [message , setMessage] = useState('')
  const navigate = useNavigate();
  
  const fetchReminders = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/reminder` , {
        headers : {
          "Content-Type" : "application/json" , 
          "Access-Control-Allow-Origin" : "*"
        } , 
        withCredentials : true
      });
      setReminders(res.data.reminders);  
    } catch (error) {
      alert('You need to login');
      navigate('/')
    }
    
  }
  useEffect(() => {
    
    fetchReminders();
    
  } , [])
  const handleCreateTask = async e => {
    e.preventDefault();
    
    if(!time || !date){
      alert("Please enter the time and date");
      setTime('')
      setDate('')
      return;
    }
    const taskTime = new Date();
    const dateArray = date.split("-");
    
    taskTime.setDate(Number(dateArray[2]));
    taskTime.setMonth(Number(dateArray[1])-1);
    taskTime.setFullYear(Number(dateArray[0]));
    const timeArray = time.split(":");
    taskTime.setHours(Number(timeArray[0]));
    taskTime.setMinutes(Number(timeArray[1]));
    taskTime.setSeconds(0);

    if(taskTime < new Date()){
      alert("You cannot enter earlier time");      
      return ;
    }

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/reminder` , {
        message : message , 
        time : taskTime
      } , {
        headers : {
          "Content-Type" : "application/json" , 
          "Access-Control-Allow-Origin" : "*"
        } , 
        withCredentials : true
      });
      setTime('');
      setDate('');
      await fetchReminders();
    } catch (error) {
      alert("Could not create new Task")
    }
    
  }

  return (
    <div className='mainpage container'>
        <div className='data-input-form'>
            <form onSubmit={handleCreateTask}>
              <p><strong>Add new Reminder</strong></p>
              <input type={"date"} value={date} onChange={e => setDate(e.target.value)} />
              <input type={"time"} value={time} onChange={e => setTime(e.target.value)} />
              <br />
              <textarea rows={10} value={message} onChange={e => setMessage(e.target.value)} />

              <br />
              <button type={"submit"}>+ Add Reminder</button>
            </form>
        </div>
        <div className='reminder-list'>
            {reminders.map(reminder => <Reminder message={reminder.message} time={new Date(reminder.time)} key={reminder._id} id={reminder._id} fetchReminders={fetchReminders}/>)}
            
        </div>

    </div>
  )
}

export default Mainpage
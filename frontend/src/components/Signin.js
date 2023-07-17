import React, { useState } from 'react';
import './../styles/Signin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    if(!email || !password){
        alert("Email or password cannot be empty");
        return ;
    }
    try {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login` , {
            email , password
        } , {
          headers : {
            "Content-Type" : "application/json" , 
            "Access-Control-Allow-Origin" : "*"
          } , 
          withCredentials : true
        });
        navigate('/home');
        

    } catch (error) {
      console.log(error.message)
        alert("Failed to login.")
    }
    setEmail('');
    setPassword('');
  }

  return (
    <div className='signin'>
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <p>Enter Email</p>
            <input type={"email"} value={email} onChange={e => setEmail(e.target.value)} />
            <p>Enter Password</p>
            <input type={"password"} value={password} onChange={e => setPassword(e.target.value)}/>
            <button type={"submit"}>Login</button>
            <p style={{"marginTop" : "10px" , "textAlign" : "center"}}>New to Notify ? <span onClick={() => navigate('/signup')} style={{"color" : "blue" , "cursor" : 'pointer'}}>Signup</span></p>
        </form>
    </div>
  )
}

export default Signin
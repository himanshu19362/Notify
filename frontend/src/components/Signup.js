import React, { useState } from 'react';
import './../styles/Signup.css';
import { passwordStrength } from 'check-password-strength';
import validator from 'email-validator';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [confirmPassword , setConfirmPassword] = useState('');
  const [strength , setStrength] = useState('Too weak');
  const navigate = useNavigate();

  const strengthConditon = () => {
    if(strength === "Too weak"){
        return {"color" : "red"};
    }
    if(strength === "Weak"){
        return {"color" : "darkgoldenrod"};
    }
    return {"color" : "green"};

  }

  const updatePassword = e => {
    e.preventDefault();
    setPassword(e.target.value) ; 
    setStrength(passwordStrength(password).value)
  }

  const handleSubmit = async e => {
    e.preventDefault();
    
    try {
      if(!validator.validate(email)){
        alert('Enter a valid Email');
        return;
    }
    if(strength !== "Strong"){
        alert("Password is weak . Make password stronger by adding numbers , lowercase , uppercase and special characters .")
        return;
    }
    if(password !== confirmPassword){
        alert("Password and the confirmed password are not matching");
    }

    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup` , {
        email , password
    });


    navigate('/')
  
    } catch (error) {
      alert('Error while signing up')      
    }
  }

  return (
    <div className='signup'>
        <h1>Signup</h1>
        <p>Enter Email</p>
        <form onSubmit={handleSubmit}>
            <input type={"email"} value={email} onChange={e => setEmail(e.target.value)} />
            <p>Enter Password</p>
            <input type={"password"} value={password} onChange={updatePassword} />
            {password && <p className='password-strength' style={strengthConditon()}>{strength}</p>}
            <p>Confirm Password</p>
            <input type={"password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <button type={"submit"}>Signup</button>
            <p style={{"marginTop" : "10px" , "textAlign" : "center"}}>Already have an account ? <span onClick={() => navigate('/')} style={{"color" : "blue" , "cursor" : 'pointer'}}>Login</span></p>
        </form>
    </div>
  )
}

export default Signup
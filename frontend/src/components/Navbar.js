import React from 'react'
import './../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({logout}) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/logout` ,  {
        headers : {
          "Content-Type" : "application/json" , 
          "Access-Control-Allow-Origin" : "*"
        } , 
        withCredentials : true
      });
      navigate('/');
    } catch (error) {
      alert('Couldnot log out');
    }
  }
  return (
    <div className='navbar'>
        <div className='container'>
            <div className='nav-left'>
                <p>Notify</p>
            </div>
            {logout && <div className='nav-right'>
              <button onClick={handleLogout}>Logout</button>
            </div>}
            
        </div>

    </div>
  )
}

export default Navbar
import React from 'react';
import './../styles/Auth.css';
import Signin from './Signin';
import Signup from './Signup';

const Auth = ({signin}) => {
  return (
    <div className='auth'>
        {signin ? <Signin /> : <Signup />}
    </div>
  )
}

export default Auth
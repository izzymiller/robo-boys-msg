import React from 'react';
import './Login.css';
import { auth, provider } from '../../firebase/config';

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((err) => alert(err));
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlzhKvw4sZcK3t2ihfVuerdAu6mwBEHPS3rA&usqp=CAU"
          alt=""
        />
        <h1>iMessage</h1>
      </div>
      <button onClick={signIn}>Sign In</button>
    </div>
  );
}

export default Login;

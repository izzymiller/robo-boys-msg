import React, { useEffect } from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import Imessage from './components/iMessage/Imessage';
import { login, logout, selectUser } from './features/userSlice';
import Login from './components/Login/Login';
import { auth } from './firebase/config';
import { useDispatch } from 'react-redux';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayNames,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  console.log(user);
  return <div className="app">{user ? <Imessage /> : <Login />}</div>;
}

export default App;

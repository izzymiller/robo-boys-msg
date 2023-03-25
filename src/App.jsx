import React, { useEffect } from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import Imessage from './components/iMessage/Imessage';
import { login, logout, selectUser } from './features/userSlice';
import { Helmet } from 'react-helmet';
import Login from './components/Login/Login';
import { auth } from './firebase/config';
import { useDispatch } from 'react-redux';

export const SEO = () => {
  return (
    <div>
      <Helmet htmlAttributes>
        <html lang="en" />
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0"></meta>
      </Helmet>
    </div>
  );
}


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
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <>
  <SEO />
  <div className="app">{user ? <Imessage /> : <Login />}</div>
  </>)
}

export default App;

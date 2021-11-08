import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import Imessage from './components/iMessage/Imessage';
import { selectUser } from './features/userSlice';
import Login from './components/Login/Login';

function App() {
  const user = useSelector(selectUser);
  console.log(user);
  return <div className="app">{user ? <Imessage /> : <Login />}</div>;
}

export default App;

import React from 'react';
import Chat from './Chat/Chat';
import './Imessage.css';
import Sidebar from './Sidebar/Sidebar';

function Imessage() {
  return (
    <div className="iMessage">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default Imessage;

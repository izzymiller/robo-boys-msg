import React from 'react';
import './SidebarChat.css';
import { Avatar } from '@material-ui/core';

function SidebarChat() {
  return (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat__info">
        <h3>Name</h3>
        <p>Message</p>
        <small>{new Date().toLocaleString()}</small>
      </div>
    </div>
  );
}

export default SidebarChat;

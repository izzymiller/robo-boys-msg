import React from 'react';
import './Chat.css';
import { IconButton } from '@material-ui/core';
import MicNoneIcon from '@material-ui/icons/MicNone';

function Chat() {
  return (
    <div className="chat">
      <div className="chat__header">
        <h4>
          To: <span className="chat__name">Room Name</span>
        </h4>
        <strong>Details</strong>
      </div>

      {/* Chat  messages */}
      <div className="chat__messages"></div>

      {/* Chat  input*/}
      <div className="chat__input">
        <form>
          <input type="text" placeholder="iMessage" />
          <button>Send Message</button>
        </form>
        <IconButton>
          <MicNoneIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;

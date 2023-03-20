import React, { forwardRef } from 'react';
import './Message.css';
import { Avatar } from '@material-ui/core';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../features/userSlice';

const Message = forwardRef(
  (
    { id, contents: { timestamp, displayName, email, message, photo, uid } },
    ref
  ) => {
    const user = useSelector(selectUser);

    return (
      <div
        ref={ref}
        className={`message ${user.email === email && 'message__sender'}`}
      >
        <Avatar src={photo} />
        <p>{message}</p>
        <small>
        <b>{displayName}</b> - {moment(new Date(timestamp?.toDate()).toUTCString()).fromNow()}
        </small>

      </div>
    );
  }
);

export default Message;

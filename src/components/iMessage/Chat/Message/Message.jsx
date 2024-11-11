import React, { forwardRef } from 'react';
import './Message.css';
import { Avatar } from '@material-ui/core';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../features/userSlice';

const Message = forwardRef(
  (
    { id, contents: { timestamp, displayName, email, message, photo, uid }, reactions },
    ref
  ) => {
    const user = useSelector(selectUser);
    
    const getReactionEmoji = (reactionType) => {
      switch (reactionType) {
        case 'Loved':
          return '❤️';
        case 'Laughed at':
          return '😂';
        case 'Liked':
          return '👍';
        case 'Emphasized':
          return '!!';
        case 'Disliked':
          return '👎';
        default:
          return '';
      }
    };

    return (
      <div
        ref={ref}
        className={`message ${user.email === email && 'message__sender'}`}
      >
        <Avatar src={photo} />
        <div className="message__content">
          {reactions && reactions.length > 0 && (
            <div className="message__reactions">
              {reactions.map((reaction, index) => (
                <div key={index} className="message__reaction" title={`${reaction.from}: ${reaction.type}`}>
                  {getReactionEmoji(reaction.type)}
                </div>
              ))}
            </div>
          )}
          <p>{message}</p>
        </div>
        <small>
          <b>{displayName}</b> - {moment(new Date(timestamp?.toDate()).toUTCString()).fromNow()}
        </small>
      </div>
    );
  }
);

export default Message;
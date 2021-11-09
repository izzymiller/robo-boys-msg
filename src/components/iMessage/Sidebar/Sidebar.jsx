import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RateReviewIcon from '@material-ui/icons/RateReview';
import SidebarChat from './SidebarChat/SidebarChat';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';
import { Tooltip } from '@material-ui/core';
import db, { auth } from '../../../firebase/config';

function Sidebar() {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    db.collection('chats').onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  });

  const addChat = () => {
    const chatName = prompt('Enter Chat Name');
    if (chatName.length === 0) {
      alert('Please Enter valid chat name');
    } else {
      db.collection('chats').add({
        chatName: chatName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Tooltip title="Logout" placement="top-start">
          <Avatar
            onClick={() => auth.signOut()}
            src={user?.photo}
            className="sidebar__avatar"
          />
        </Tooltip>
        <div className="sidebar__input">
          <SearchIcon />
          <input placeholder="Search" />
        </div>
        <IconButton variant="outlined" className="sidebar__inputButton">
          <RateReviewIcon onClick={addChat} />
        </IconButton>
      </div>
      <div className="sidebar__chats">
        {chats.map(({ id, data: { chatName } }) => (
          <SidebarChat key={id} id={id} chatName={chatName} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

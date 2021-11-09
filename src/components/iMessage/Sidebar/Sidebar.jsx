import React from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RateReviewIcon from '@material-ui/icons/RateReview';
import SidebarChat from './SidebarChat/SidebarChat';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';
import { Tooltip } from '@material-ui/core';
import { auth } from '../../../firebase/config';

function Sidebar() {
  const user = useSelector(selectUser);

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
          <RateReviewIcon />
        </IconButton>
      </div>
      <div className="sidebar__chats">
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
}

export default Sidebar;

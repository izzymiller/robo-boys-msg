import React, { useEffect, useState, useRef } from 'react';
import './Chat.css';
import { IconButton } from '@material-ui/core';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

import Message from './Message/Message';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';
import { selectChatId, selectChatName } from '../../../features/chatSlice';
import db from '../../../firebase/config';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';

function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [lastMessage,setLastMessage] = useState(false)
  const [nextPosts_loading, setNextPostsLoading] = useState(false);
  const [mostRecentMessageType, setMostRecentMessageType] = useState('new')
  const [containerStatus, setContainerStatus] = useState('asleep')
  const user = useSelector(selectUser);
  // const chatName = useSelector(selectChatName);
  const chatName = 'robo boys' //hardcode this for now, just one chat
  // const chatId = useSelector(selectChatId);
  const chatId = 'rHGTegWba1tDsNvZ6yc1' //hardcode this for now, just one chat
  const lastMsgRef = useRef(null)
  const firstMsgRef = useRef(null)

  const updateContainerStatus = () => {
    fetch('https://izzymiller--alive.modal.run/')
        .then(response => response.json())
        .then(data => {
          if(data.num_total_runners === 0) {
            setContainerStatus('asleep')
          } else if(data.num_total_runners >= 1 && data.backlog === 0) {
            setContainerStatus('awake')
          } else if(data.backlog === 1 ) {
            setContainerStatus('waking up')
          }
        });
  }

  const wakeContainer = () => {

    fetch('https://izzymiller--wake.modal.run/').then(setContainerStatus('waking up'))
  }

  const firstPosts = () => {
    try {
      db.collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('timestamp', 'desc').limit(50)
      .onSnapshot((snapshot) =>{
        const d = snapshot.docs.reverse()
        setMessages(
          d.map((doc) => ({ id: doc.id, data: doc.data() }))
        )
        setLastMessage(
          d[0].data().timestamp
        )
        setMostRecentMessageType('new')
      }
        
      );
    } catch(e) {
      console.log(e)
    }
  }

  const nextPosts = (key) => {
    setNextPostsLoading(true);
    try {
      db.collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .startAfter(key)
        .limit(25)
        .onSnapshot((snapshot) => {
          const newMsgs = snapshot.docs.reverse().map((doc) => ({ id: doc.id, data: doc.data() }))
          setMessages(
            [...newMsgs,...messages ]
            )
            setLastMessage(
              newMsgs[0].data.timestamp
            )
        }
        );
        setMostRecentMessageType('old')
        setNextPostsLoading(false);
    } catch (e) {
      console.log(e);
      setNextPostsLoading(false);
    }
  }
  
  useEffect(() => {
    if (chatId) {
      firstPosts();
      updateContainerStatus();
    }
  }, [chatId]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateContainerStatus();
    }, 5000);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])


  const scrollToBottom = () => {
    lastMsgRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  const scrollToTop = () => {
    firstMsgRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const Status = () => {
    if(containerStatus == 'awake') {
      return  (<div className='bot__status'>
        <p>bot status: <b>awake</b></p>
      </div>)
    } else if(containerStatus == 'asleep') {
      return(
        <div className='bot__status'>
      <p>bot status: <b>asleep. <p onClick={() => {wakeContainer()}}>wake them up?</p></b></p>
      </div>
      )
    } else if(containerStatus == 'waking up') {
      return (<div className='bot__status'><p>bot status: <b>waking up</b>. May take up to 5 minutes</p></div>)
    }
  }

  useEffect(() => {
    if(mostRecentMessageType === 'new'){
      scrollToBottom()
    } else {
      scrollToTop()
    }
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection('chats').doc(chatId).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });
    setInput('');
    return false
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="header__icon">
          <p>🤖</p>
        <p>
          {chatName} 
        </p>
        <Status />
        </div>
       
      </div>

      {/* Chat  messages */}
      <div className="chat__messages">
      <div className='chat__loading'  ref={firstMsgRef}>
        {nextPosts_loading ? (
          <p>Loading..</p>
        ) : lastMessage ? (
          <button className='chat__more_button' onClick={() => nextPosts(lastMessage)}>Load older messages</button>
        ) : (
          <span>No more messages</span>
        )}
      </div>
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} id={id} contents={data} />
          ))}
        </FlipMove>
        <div ref={lastMsgRef} />
      </div>

      {/* Chat  input*/}
      <div className="chat__input">
        <form method="POST" onSubmit={(e) => sendMessage(e)}>
          <input
            type="text"
            placeholder="iMessage"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
        <div className='send__button'>
        <IconButton size="small" color="primary" onClick={sendMessage}>
          <ArrowCircleUpIcon />
        </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Chat;

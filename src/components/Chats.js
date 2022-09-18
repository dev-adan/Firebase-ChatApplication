import { onSnapshot, doc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase/config";
import {userChat} from '../features/chatSlicer'


const Chats = () => {
  const [chats, setChats] = useState(['']);
  const loggedUser = useSelector((state) => state.chat.user);
  const dispatch = useDispatch(); 

  useEffect(() => {

  
    if (loggedUser.uid) {
      const unsub = onSnapshot(
        doc(db, "userChats", loggedUser.uid),
        (snapshot) => {
          setChats(snapshot.data());
        }
      );
      return () => {
        unsub();
      };
    }
  }, [loggedUser.uid]);


  const handleSelect = (user) => {

    dispatch(userChat(user))
  }

  return (
    <div className="chats">

    {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map(chat => (
      <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
        <img
          src={chat[1]?.userInfo?.photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW6wRWOjhYe9HP1hvqWiY_x4tDvhbtNcvKUw&usqp=CAU'}
          alt=""
        />
        <div className="userChatInfo">
          <span>{chat[1]?.userInfo?.displayName}</span>
          <p>{chat[1]?.lastMessage?.text}</p>
        </div>
      </div>

    ))}
      
    </div>
  );
};

export default Chats;

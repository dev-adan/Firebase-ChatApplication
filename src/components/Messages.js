import React,{useEffect, useState} from 'react'
import Message from './Message'
import { useSelector } from 'react-redux'
import { onSnapshot } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../firebase/config';
const Messages = () => {


  const chatid = useSelector(state => state.chat.chatId);
  const [messages,setMessages] = useState();

  useEffect(() => {

    if(chatid){
      
      const unsub = onSnapshot(doc(db,'chats',chatid),(doc) => {    
    doc.exists() && setMessages(doc.data().messages) 
    })
  return () => {
      unsub();
    };

    }


  }, [chatid]);

  return (
    <div className='messages'>
    {messages?.map((m) => (
      <Message message={m} key={m.id}/>
      
    ))}
        
    </div>
  )
}
{/* <Message message={m} key={idx}/> */}
export default Messages
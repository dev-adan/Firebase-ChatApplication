import React from 'react'
import { useSelector } from 'react-redux'


const Message = ({message}) => {
  const loggeduser = useSelector(state => state.chat.user)
  const chatuser = useSelector(state => state.chat.chatUser)


  return (
    <div className={`message ${message.senderId === loggeduser.uid && 'owner'}`}>
      <div className='messageInfo'>
        <img src={message.senderId === loggeduser.uid ? loggeduser.photoURL : chatuser.photoURL } alt='message'/>
        <span>just now</span>
      </div>

      <div className='messageContent'>
       {message.text && <p>{message.text}</p> }
        {message.img && <img style={{height : '150px',width : 'auto'}} src={message.img} alt=''/> }
      </div>

    </div>
  )
}

export default Message
import React from 'react'
import Cam from '../img/cam.png'
import Add from '../img/add.png'
import More from '../img/more.png'
import {Messages,Input} from '../components'
import { useSelector } from 'react-redux'
const Chat = () => {

  const chatUser = useSelector(state => state.chat.chatUser);


  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>{chatUser?.displayName}</span>
          <div className='chatIcons'>
            <img src={Cam} alt='cam'/>
            <img src={Add} alt='add'/>
            <img src={More} alt='more'/>
          </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat
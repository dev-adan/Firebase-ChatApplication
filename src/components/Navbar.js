import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/config'

import { useSelector } from 'react-redux'
const Navbar = () => {
  const {user} = useSelector(state => state.chat)
  
  return (
    <div className='navbar'>
        <span className='logo'>Eden Chat</span>
        <div className='user'>
            <img src={user?.photoURL} alt='img'/>
            <span>{user?.displayName}</span>
            <button onClick={() => signOut(auth)}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar
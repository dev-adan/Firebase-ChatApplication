import React from 'react'
import {Chats,Navbar,Search} from '../components'


const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Navbar/>
        <Search/>
        <Chats/>
    </div>
  )
}

export default Sidebar
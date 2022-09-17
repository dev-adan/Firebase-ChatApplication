import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar'>
        <span className='logo'>Eden Chat</span>
        <div className='user'>
            <img src='https://avatars.dicebear.com/api/adventurer/your-custom-seed.svg' alt='img'/>
            <span>Adan</span>
            <button>Logout</button>
        </div>
    </div>
  )
}

export default Navbar
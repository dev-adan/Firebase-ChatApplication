import React from 'react'

const Message = () => {
  return (
    <div className='message'>
      <div className='messageInfo'>
        <img src='https://avatars.dicebear.com/api/adventurer/your-custom-seed.svg' alt='message'/>
        <span>just now</span>
      </div>

      <div className='messageContent'>
        <p>hello, what are you doing now adays</p>
        {/* <img src='https://avatars.dicebear.com/api/adventurer/your-custom-seed.svg' alt=''/> */}
      </div>

    </div>
  )
}

export default Message
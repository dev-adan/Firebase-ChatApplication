import React from 'react'

const Search = () => {
  return (
    <div className='search'>
        <div className='searchForm'>
            <input type='text' placeholder='find a user'/>
        </div>

        <div className='userChat'>
            <img src='https://avatars.dicebear.com/api/adventurer/your-custom-seed.svg' alt='img'/>
            <div className='userChatInfo'>
                <span>Adan</span>
            </div>
        </div>
    </div>
  )
}

export default Search
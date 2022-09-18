import React,{useState} from 'react';
import { collection,doc,getDocs,query,setDoc,updateDoc,where,getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useSelector } from 'react-redux';
import { serverTimestamp } from 'firebase/firestore';

const Search = () => {

  const [userName,setUserName] = useState('');
  const [user,setUser] = useState(null);
  const [error,setError] = useState(false);
  const loggedUser = useSelector(state => state.chat.user);

  const handleSearch = async () => {
    try{
    const q = query(collection(db,'users'),where('displayName','==',userName));
    const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((doc) => {
          setUser(doc.data())
      })
    }catch(error){
      console.log(error)
      setError(error)
    }
  }

  const handleKey = (e) => {

    if(!userName || userName.length === 1){
      setUser(null);
    }
    e.code === 'Enter' && handleSearch();


  }

  const handleSelect = async () => {


    const combinedId = loggedUser.uid > user.uid ? loggedUser.uid + user.uid : user.uid + loggedUser.uid;
    const res = await getDoc(doc(db,'chats',combinedId));

   
    try{

      if(!res.exists() && user.uid !== loggedUser.uid){
       
        await setDoc(doc(db,'chats',combinedId), {messages : []});

        await updateDoc(doc(db,'userChats',loggedUser.uid),{
          [combinedId+".userInfo"] : {
            uid : user.uid,
            displayName : user.displayName,
            photoURL : user.photoURL
          },
          [combinedId+".date"] : serverTimestamp()

        })

        await updateDoc(doc(db,'userChats',user.uid),{
          [combinedId+".userInfo"] : {
            uid : loggedUser.uid,
            displayName : loggedUser.displayName,
            photoURL : loggedUser.photoURL
          },
          [combinedId+".date"] : serverTimestamp()

        })


      }

    }catch(error) {
      console.log(error)
    }

    setUser(null);
    setUserName('')

  }

  return (
    <div className='search'>
        <div className='searchForm'>
            <input value={userName} type='text' placeholder='find a user' onKeyDown={handleKey} onChange={e => setUserName(e.target.value)}/>
        </div>
        
        {error && <span>Something went wrong.</span>}
{
  user && <div className='userChat' onClick={handleSelect}>
            <img src={user?.photoURL} alt='img'/>
            <div className='userChatInfo'>
                <span>{user?.displayName}</span>
            </div>
        </div>
}
        


    </div>
  )
}

export default Search
import './App.css';
import { Login, Register,Home } from './pages';
import { Routes,Route } from 'react-router-dom';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { setUser } from './features/chatSlicer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const chatslicer = useSelector(state => state.chat)
  useEffect(() => {

    const unsub = onAuthStateChanged(auth,(user) => {
      console.log(user)
          dispatch(setUser(user));
    })

    return () => {
      unsub();
    }

  },[])

  return (
    <div className="App">
    { chatslicer.authIsReady &&
      <Routes>
        <Route path='/' element={chatslicer.user ? <Home/> :  <Login/>}/>
        <Route path='/register' element={chatslicer.user ? <Home/> : <Register/>}/>
        <Route path='/login' element={chatslicer.user ? <Home/> : <Login/>}/>
      </Routes>
      
      }
    </div>

    
  );
}

export default App;

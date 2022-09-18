import React from 'react'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../firebase/config';

const Login = () => {

  const loginHandler = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;
    await signInWithEmailAndPassword(auth,email,password);

  
  }
  return (
    <div className='formContainer' >
        <div className='formWrapper'>
            <span className='logo'>Eden Chat</span>
            <span className='title'>Login</span>

            <form onSubmit={loginHandler}>
                <input type='email' placeholder='email'/>
                <input type='password' placeholder='password'/>

                <button>Sign In</button>
            </form>
            <p>You don't have an account? <Link style={{textDecoration : 'none'}} to='/register'>Register</Link></p>
        </div>

    </div>
  )
}

export default Login
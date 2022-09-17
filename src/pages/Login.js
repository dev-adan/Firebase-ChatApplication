import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Eden Chat</span>
            <span className='title'>Login</span>

            <form>
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
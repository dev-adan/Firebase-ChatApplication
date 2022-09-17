import React from 'react'
import Add from '../img/addAvatar.png'
import {auth,storage,db} from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {uploadBytesResumable, getDownloadURL,ref } from "firebase/storage";
import {doc,setDoc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Register = () => {

  const navigate = useNavigate();
  const handleSubmit = async  (e) => {
    e.preventDefault()

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try{
       const res = await createUserWithEmailAndPassword(auth,email,password);

       const storageRef = ref(storage,displayName)

       const uploadImage = uploadBytesResumable(storageRef,file);


       uploadImage.on('state_changed',  (snapshot) => {


       },(error) => console.log(error), () => {

        getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {

          updateProfile(res.user, {
            displayName,
            photoURL : downloadURL
          }).then( setDoc(doc(db,'users',res.user.uid),{
            uid : res.user.uid,
            displayName,
            email,
            photoURL : downloadURL
    
           })).then(() => {
            setDoc(doc(db,'userChats',res.user.uid),{})
            navigate('/')
           }
           )

          
        })
       })


    }catch(error){
      console.log(error)
    }

    


  }

  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Eden chat</span>
            <span className='title'>Register</span>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='display name'/>
                <input type='email' placeholder='email'/>
                <input type='password' placeholder='password'/>
                <input style={{display : 'none'}} type='file' id='file'/>
                <label htmlFor='file'><img src={Add} alt='image'/>Add an Avatar</label>
                <button>Sign up</button>
            </form>
            <p>You have an account ? <Link to='/login' style={{textDecoration : 'none'}}>Login</Link></p>
        </div>
    </div>
  )
}

export default Register
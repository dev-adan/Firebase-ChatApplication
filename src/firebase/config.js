
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA9LkJiwRB1R4NxSLBhCf24bMykPwGDntI",
  authDomain: "eden-chat-d0742.firebaseapp.com",
  projectId: "eden-chat-d0742",
  storageBucket: "eden-chat-d0742.appspot.com",
  messagingSenderId: "740749777801",
  appId: "1:740749777801:web:75375cdf3b947eb3c61f58"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const storage = getStorage(app);
const db = getFirestore(app);

export {auth,storage,db}
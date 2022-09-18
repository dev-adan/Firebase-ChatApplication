import React, { useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { useSelector } from "react-redux";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase/config";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const user = useSelector((state) => state.chat.user);
  const chatuser = useSelector((state) => state.chat.chatUser);
  const combinedid = useSelector((state) => state.chat.chatId);

  const handleSend = async () => {




    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadImage = uploadBytesResumable(storageRef, img);

      uploadImage.on(
        "state_changed",
        (snapshot) => {},
        (error) => console.log(error),
        () => {
          getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
            updateDoc(doc(db, "chats", combinedid), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: user.uid,
                data: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );

    } else if(text) {
      
      await updateDoc(doc(db, "chats", combinedid), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: user.uid,
          data: Timestamp.now(),
        }),
      });

     
    }
   

    await updateDoc(doc(db,'userChats',user.uid),{
      [combinedid +'.lastMessage'] : {
        text
      },

      [combinedid+'.date'] : serverTimestamp()
    })

    await updateDoc(doc(db,'userChats',chatuser.uid),{
      [combinedid +'.lastMessage'] : {
        text
      },

      [combinedid+'.date'] : serverTimestamp()
    })



    setText('')
    setImg(null);
  };

  return (
    <div className="input">
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Type something..."
        value={text}
      />

      <div className="send">
        <img src={Attach} alt="attach" />
        <input
          onChange={(e) => setImg(e.target.files[0])}
          type="file"
          style={{ display: "none" }}
          id="file"
          
         
        />
        <label htmlFor="file">
          <img src={Img} alt="send img" />
        </label>
        <button onClick={handleSend}>send</button>
      </div>
    </div>
  );
};

export default Input;

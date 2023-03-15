import {React, useState, useContext} from "react";
import ATC from "../img/gattach.png"
import VN from "../img/gvn.png"
import { ChatContext } from "../context/ChatContext"
import { AuthContext } from "../context/AuthContext"
import { v4 as uuid } from 'uuid'
import { arrayUnion, Timestamp, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { myAuth, myStorage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



const Input = () => {
    const [text, setText] = useState("")
    const [img, setImg] = useState(null)

    const {data} = useContext(ChatContext)
    const {currentUser} = useContext(AuthContext)

    const handleSend = async () => {
        if(img){
            const storageRef = ref(myStorage, uuid())
            const uploadTask = await uploadBytesResumable(storageRef, img).then(

                () => {
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        try {
                            await updateDoc(doc(db, "chats", data.chatId), {
                                messages: arrayUnion({
                                    id: uuid(),
                                    text,
                                    senderId: currentUser.uid,
                                    date: Timestamp.now(),
                                    img: downloadURL
                                })
                            })
                        } 
                        catch (error) {
                            console.log(error)
                        }
                    });
                })
        }
        else{
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now()
                })
            })
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },

            [data.chatId + ".date"]: serverTimestamp()
        })

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },

            [data.chatId + ".date"]: serverTimestamp()
        })

        setText("")
        setImg(null)
    }

    return(
        <div className="input">
            <input type="text" placeholder="Type A Message" value={text} onChange={ (e) => setText(e.target.value) }/>
            <div className="send">
                <img src={VN} alt="" />
                <input type="file" style={{display: "none"}} id="file" onChange={ (e) => setImg(e.target.files[0]) } />
                <label htmlFor="file">
                    <img src={ATC} alt="" />
                </label>
                <button onClick={ () => handleSend() }>Send</button>
            </div>
        </div>
    )
}

export default Input;
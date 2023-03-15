import React from "react";
import { useState } from "react";
import BBS from "../img/gboy.jpg"
import { collection, getDoc, query, setDoc, where, doc, updateDoc, serverTimestamp, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const Search = () => {
    const [username, setUsername] = useState("")
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false)

    const {currentUser} = useContext(AuthContext)

    const handleSearch = async () => {
        const q = query(collection(db, "users"), where("displayName", "==", username))

        try{
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            })
        }
        catch(error){
            setErr(true)
        }

    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch()
    }

    const handleSelect = async () => {
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid

        try {
            const resp = await getDoc(doc(db, "chats", combinedId))

            if(!resp.exists()){
                await setDoc(doc(db, "chats", combinedId) , { messages: [] })

                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId+".userInfo"] : {uid: user.uid, displayName: user.displayName, photoURL: user.photoURL},
                    [combinedId+".date"] : serverTimestamp()
                })

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId+".userInfo"] : {uid: currentUser.uid, displayName: currentUser.displayName, photoURL: currentUser.photoURL},
                    [combinedId+".date"] : serverTimestamp()
                })
            }
        } 
        catch (error) {
            setErr(true)
        }

        setUser(null)
        setUsername("")
    }

    return(
        <div className="search">
            <div className="searchform">
                <input type="text" placeholder="Find A User" value={username} onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            {err && <span>User Not Found !</span>}
            {user && <div className="userchat" onClick={handleSelect}>
                <img src={user.photoURL} alt="" />
                <div className="userchatinfo">
                    <span>{user.displayName}</span>
                </div>
            </div>}
            
        </div>
    )
}

export default Search;
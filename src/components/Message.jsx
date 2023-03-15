import React, { useContext, useRef, useEffect } from "react";
import { ChatContext } from "../context/ChatContext"
import { AuthContext } from "../context/AuthContext"


const Message = ({ message }) => {
    const {data} = useContext(ChatContext)
    const {currentUser} = useContext(AuthContext)

    const ref = useRef()

    useEffect(() => {
        ref.current?.scrollIntoView({behavior: "smooth"})
    }, [message])

    return(
        <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
            <div className="messageinfo">
                <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
                <span></span>
            </div>
            <div className="messagecontent">
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="" />}
            </div>
        </div>
    )
}

export default Message;
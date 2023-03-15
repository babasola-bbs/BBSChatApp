import { React, useContext } from "react";
import VD from "../img/gvideo.png"
import AF from "../img/gaddfriend.png"
import MR from "../img/gmore.png"
import Messages from "../components/Messages";
import  Input from "../components/Input";
import { ChatContext } from "../context/ChatContext";




const Chat = () => {
    const {data} = useContext(ChatContext)

    return(
        <div className="chat">
            <div className="chatinfo">
                <span>{data.user?.displayName}</span>
                <div className="chaticons">
                    <img src={VD} alt="" />
                    <img src={AF} alt="" />
                    <img src={MR} alt="" />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    )
}

export default Chat;
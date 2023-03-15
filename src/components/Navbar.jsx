import React from "react";
import BBS from "../img/gboy.jpg"
import { signOut } from "firebase/auth"
import { myAuth } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const {currentUser} = useContext(AuthContext)

    return(
        <div className="navbar">
            <span className="logo">BBS Chat</span>
            <div className="user">
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                <button onClick={ () => signOut(myAuth) }>Logout</button>
            </div>
        </div>
    )
}

export default Navbar;
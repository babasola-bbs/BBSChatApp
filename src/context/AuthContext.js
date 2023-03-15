import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { myAuth } from "../firebase";




export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const unsub = onAuthStateChanged(myAuth, (user) => {
                        setCurrentUser(user)
                        console.log(user)
        });

        return () => { unsub() };
    }, []);

    return <AuthContext.Provider value={{currentUser}}>{children}</AuthContext.Provider>
}
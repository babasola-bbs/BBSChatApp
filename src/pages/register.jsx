import React from "react";
import Add from "C:/Users/DELL/FirebaseChatApp/src/img/file.jpg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { myAuth, myStorage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const username = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        const auth = myAuth;


        try{ 
            const resp = await createUserWithEmailAndPassword(auth, email, password)
            

            const storageRef = ref(myStorage, username);
            const uploadTask = await uploadBytesResumable(storageRef, file).then(

                () => {
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        try {
                            await updateProfile(resp.user, {
                                displayName: username,
                                photoURL: downloadURL,
                            })
                            await setDoc(doc(db, "users", resp.user.uid), {
                                uid: resp.user.uid,
                                displayName: username,
                                photoURL: downloadURL,
                                email: email
                            });
                            await setDoc(doc(db, "userChats", resp.user.uid), {});
                            navigate("/")
                        } 
                        catch (error) {
                            setErr(true)
                            console.log(error)
                        }

                    });
                })
        }
        catch(error){
            setErr(true)
        }
    }




    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">BBS Chat</span>
                <span className="title">Register</span>
                <form onSubmit={ handleSubmit }>
                    <input type="text" placeholder="Display Name"  />
                    <input type="email" placeholder="Email"  />
                    <input type="password" placeholder="Password"  />
                    <input style={{display: "none"}} type="file" id="file"  />
                    <label htmlFor="file">
                        <img style={{width: "42px", cursor: "pointer"}} src={Add} alt="file" />
                        <span>Upload Your Image</span>
                    </label>
                    <button>Sign Up</button>
                    { err && <span>Something Went Wrong !</span> }
                </form>
                <p>Have An Account Already ? <Link to="/register">Login</Link></p>
            </div>
        </div>
    )
}

export default Register;




// import React from "react";
// import Add from "C:/Users/DELL/FirebaseChatApp/src/img/file.jpg";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { myAuth, myStorage, db } from "../firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { useState } from "react";
// import { doc, setDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//     const [err, setErr] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         setLoading(true);
//         e.preventDefault();
//         const displayName = e.target[0].value;
//         const email = e.target[1].value;
//         const password = e.target[2].value;
//         const file = e.target[3].files[0];
//         const auth = myAuth;

//         try{ 
//             const resp = await createUserWithEmailAndPassword(auth, email, password)
//             const date = new Date().getTime();

//             const storage = myStorage;
//             const storageRef = ref(storage, `${displayName + date}`);


//             await uploadBytesResumable(storageRef, file).then(() => {
//                 // Handle successful uploads on complete
//                 // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//                 getDownloadURL(storageRef).then(async (downloadURL) => {
//                     try{
//                         await updateProfile(resp.user, {displayName, photoURL: downloadURL});
//                         await setDoc(doc(db, "users", resp.user.uid), {
//                             uid: resp.user.uid,
//                             displayName,
//                             email,
//                             photoURL: downloadURL
//                         });
                        // await setDoc(doc(db, "userChats", resp.user.uid), {});
                        // navigate("/")
//                     }
//                     catch (err) {
//                         console.log(err);
//                         setErr(true);
//                         setLoading(false);
//                     }                    
//                 });
//             });
//         }
//         catch(error){
//             setErr(true);
//             setLoading(false);
//         }        
//     };




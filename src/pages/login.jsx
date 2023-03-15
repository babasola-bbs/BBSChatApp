import {React, useState } from "react";
import { myAuth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";


const Login = () => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const auth = myAuth;


        try{ 
            await signInWithEmailAndPassword(myAuth, email, password)
            navigate("/")
        } 
        catch(error){
            setErr(true)
            console.log(error)
        }

    }


    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">BBS Chat</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email"  />
                    <input type="password" placeholder="Password"  />
                    <button>Sign In</button>
                    { err && <span>Something Went Wrong !</span> }
                </form>
                <p>Don't Have An Account ? <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}

export default Login;
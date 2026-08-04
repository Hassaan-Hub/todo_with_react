import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/Firebase';


const Login = () => {

    const navigate1 = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginPage = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate1("/dashboard");
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                console.log(error);
            });
    }

    const navigate = useNavigate()
    return (
        <div>
            <div>
                <p>
                    Create an account.
                    <button onClick={() => navigate("/")}>
                        Sign up
                    </button>
                </p>

                <div>
                    <input type="email" value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                    <br /><br />
                    <input type="password" value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                </div>
                <div>
                    <button onClick={() => {
                        loginPage(email, password)
                        setPassword("")
                        setEmail("")
                    }}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login
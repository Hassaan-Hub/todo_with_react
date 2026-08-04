import React, { useState } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom";
import { auth, createUserWithEmailAndPassword } from '../config/Firebase'
import Login from './Login';

const Signup = () => {

  const navigate = useNavigate();
  navigate("/login");

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signUpFirebase = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
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

  const navigate1 = useNavigate()

  return (
    <div>
      <div>
        <p>
          Already have an account? {" "}
          <button onClick={() => navigate1("/login")}>
            Login
          </button>
        </p>
        <div>
          Email <input type="email" value={email} onChange={(e) => {
            setEmail(e.target.value)
          }} />
          <br /><br />
          Password <input type="password" value={password} onChange={(e) => {
            setPassword(e.target.value)
          }} />
        </div>
        <button onClick={() => {
          signUpFirebase(email, password)
          console.log(email);
          console.log(password);
          setPassword("")
          setEmail("")
        }}>sign up</button>
      </div>

    </div>
  )
}

export default Signup
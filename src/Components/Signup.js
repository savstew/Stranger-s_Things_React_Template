import * as React from "react"
import { useState } from "react";
import { BASE_URL } from "../constants";
import { Link, useNavigate } from "react-router-dom"
import Header from "./Header";

export default function Signup(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate()
    const registerUser = async (data) => {
      try {
        await fetch(
          `${BASE_URL}/users/register`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: data
          })
        }).then(navigate("/login"));
      } catch (err) {
        console.error(err);
      }
    } 
    const handleSubmit = (event) => {
        event.preventDefault()
        registerUser({username: username, password: password})
    }   
    return(
        <div>
          <Header/>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
            <input minLength="5" maxLength="15" name='username' value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Username">
            </input>
            <input minLength="8" maxLength="16" type='password' name='password' value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password">
            </input>
            <button type='submit'>
                Create Account
            </button>
            </form>
            <Link to={"/login"}>Already have an account? Log In</Link>
        </div>
    )
}

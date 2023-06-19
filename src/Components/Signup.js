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
          <div style={{display: "flex", justifyContent: "center", alignContent: "center", paddingTop: "5%"}}>
            <div style={{textAlign: "center", fontFamily: "arial", color: "rgb(4,31,100)", width: "500px", height: "500px", backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center", borderRadius: "8px", boxShadow: "rgba(4,31,100, 0.4) -5px 5px, rgba(4,31,100, 0.3) -10px 10px, rgba(4,31,100, 0.2) -15px 15px, rgba(4,31,100, 0.1) -20px 20px, rgba(4,31,100, 0.05) -25px 25px"}}>
              <h1>Sign Up</h1>
              <form onSubmit={handleSubmit}>
              <input minLength="5" maxLength="15" name='username' value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Username" style={{marginRight: "5px"}}>
              </input>
              <input minLength="8" maxLength="16" type='password' name='password' value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" style={{marginRight: "5px"}}>
              </input>
              <button type='submit'>
                  Create Account
              </button>
              </form>
              <Link to={"/login"} style={{marginTop: "30px"}}>Already have an account? Log In</Link>
            </div>
          </div>
        </div>
    )
}

import * as React from "react"
import { useState } from "react";
import { BASE_URL } from "../constants";
import { Link, useNavigate } from "react-router-dom"
import Header from "./Header";

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    let navigate = useNavigate()
    const loginUser = async (data) => {
      try {
        const response = await fetch(`${BASE_URL}/users/login`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: data
          })
        });
        const result = await response.json();
        localStorage.setItem('token', result.data.token)
      } catch (err) {
        console.error(err);
      } finally {
        if(localStorage.getItem('token'))
          navigate("/profile") 
        else{
          setError(true)
        }
      }
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        loginUser({username: username, password: password})
    }   
    return(
        <div>
            <Header/>
            <div style={{display: "flex", justifyContent: "center", alignContent: "center", paddingTop: "5%"}}>
              <div style={{textAlign: "center", fontFamily: "arial", color: "rgb(4,31,100)", width: "500px", height: "500px", backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center", borderRadius: "8px", boxShadow: "rgba(4,31,100, 0.4) -5px 5px, rgba(4,31,100, 0.3) -10px 10px, rgba(4,31,100, 0.2) -15px 15px, rgba(4,31,100, 0.1) -20px 20px, rgba(4,31,100, 0.05) -25px 25px"}}>
                <h1>Log In</h1>
                <form onSubmit={handleSubmit}>
                <input name='username' value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Username" style={{marginRight: "5px"}}>
                </input>
                <input type='password' name='password' value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" style={{marginRight: "5px"}}>
                </input>
                <button type='submit'>
                    Log In
                </button>
                </form>
                <p style={{color: "red"}}>{error ? "Invalid Username or Password" : ""}</p>
                <Link to={"/signup"}>Don't have an account? Sign Up</Link>
              </div>
            </div>
        </div>
    )
}

// annasteva jennie
// aaron pridemonth
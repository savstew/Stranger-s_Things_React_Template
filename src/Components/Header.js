import * as React from "react"
import { BASE_URL } from "../constants"
import { Link, useNavigate } from "react-router-dom"

export default function Header(){
    const navigate = useNavigate()
    return(
        <div style={{backgroundColor: "#041f64", boxShadow: "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset", fontFamily: "arial", display: "flex", justifyContent: "end", alignItems: "center"}}>
            <h2 style={{color: "white", marginRight: localStorage.getItem('username') ? "" : "auto", marginLeft: "20px"}}>
                Stranger's Things
            </h2>
            {localStorage.getItem('username') ? 
            <p style={{color: "white", marginRight: "auto", marginTop: "18px", marginLeft: "10px", fontSize: "12px"}}>
                Welcome, {localStorage.getItem('username')}.
            </p> :
            <></>}
            <h2><Link to={"/"} style={{textDecoration: "none", color: "white", margin: "20px", textTransform: "uppercase"}}>
                Home
            </Link></h2>
            <h2><Link to={"/posts"} style={{textDecoration: "none", color: "white", margin: "20px", textTransform: "uppercase"}}>
                Posts
            </Link></h2>
            {localStorage.getItem('token') ? 
            <h2><Link to={"/profile"} style={{textDecoration: "none", color: "white", margin: "20px", textTransform: "uppercase"}}>
                Profile
            </Link></h2> : <></>}
            {localStorage.getItem('token') ? 
            <button onClick= {()=>{localStorage.setItem('token', "") 
            localStorage.setItem('id', "")
            localStorage.setItem('username', "")
            navigate("/login")}} style={{cursor: "pointer", border: "none", backgroundColor: "rgb(0, 0, 0, 0.0)", color: "white", fontFamily: "arial", 
            textTransform: "uppercase", 
            fontSize: "16px", marginLeft: "10px", marginRight: "20px", padding: "0px"}}><h2>
                Logout
            </h2></button> :
            <button onClick= {()=>{navigate('/login')}} style={{cursor: "pointer", border: "none", backgroundColor: "rgb(0, 0, 0, 0.0)", color: "white", fontFamily: "arial", 
            textTransform: "uppercase", fontSize: "16px", marginLeft: "10px", marginRight: "20px", padding: "0px"}}><h2>
                Login
            </h2></button>}
        </div>
    )
}
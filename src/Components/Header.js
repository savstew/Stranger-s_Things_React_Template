import * as React from "react"
import { BASE_URL } from "../constants"
import { Link } from "react-router-dom"

export default function Header(){
    return(
        <div style={{backgroundColor: "black", textTransform: "uppercase", fontFamily: "arial", display: "flex", justifyContent: "end", alignItems: "center"}}>
            <h2 style={{color: "white", marginRight: "auto", marginLeft: "20px"}}>Stranger's Things</h2>
            <h2><Link to={"/"} style={{textDecoration: "none", color: "white", margin: "20px" }}>Home</Link></h2>
            <h2><Link to={"/posts"} style={{textDecoration: "none", color: "white", margin: "20px" }}>Posts</Link></h2>
            <h2><Link to={"/profile"} style={{textDecoration: "none", color: "white", margin: "20px" }}>Profile</Link></h2>
            <button onClick= {()=>{localStorage.setItem('token', "")}} style={{cursor: "pointer", border: "none", backgroundColor: "black", color: "white", fontFamily: "arial", textTransform: "uppercase", 
            fontSize: "16px", marginLeft: "10px", marginRight: "20px", padding: "0px"}}><h2>Logout</h2></button>
        </div>
    )
}
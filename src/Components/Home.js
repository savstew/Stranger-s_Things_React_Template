import * as React from "react"
import { BASE_URL } from "../constants"
import { useNavigate } from "react-router-dom"
import Header from "./Header"

export default function Home(){
    const navigate = useNavigate()
    return(
        <>
        <Header/>
        <div style={{display: "flex", justifyContent: "center", alignContent: "center", paddingTop: "5%"}}>
            <div style={{textAlign: "center", fontFamily: "arial", color: "rgb(4,31,100)", width: "500px", height: "500px", backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center", borderRadius: "8px", boxShadow: "rgba(4,31,100, 0.4) -5px 5px, rgba(4,31,100, 0.3) -10px 10px, rgba(4,31,100, 0.2) -15px 15px, rgba(4,31,100, 0.1) -20px 20px, rgba(4,31,100, 0.05) -25px 25px"}}>
                <h1 style={{marginTop: "60px", fontSize: "42px"}}>Welcome to Stranger's Things</h1>

                {localStorage.getItem('token') ? <button  onClick={()=>{navigate('/profile')}} style={{backgroundColor: "white", color: "#041f64", borderRadius: "5px", border: "1px solid #041f64", width: "150px", height: "35px", marginTop: "auto"}}>
                    Profile</button> : 
                    <button onClick={()=>{navigate('/login')}} style={{backgroundColor: "white", color: "#041f64", borderRadius: "5px", border: "1px solid #041f64", width: "150px", height: "35px", marginTop: "auto"}}>
                        Log In
                    </button>}
                <div style={{display: "flex", marginTop: "auto", marginBottom: "50px", alignItems: "center"}}>
                <img alt = "" src="couch.png" style={{width: "150px", height: "80px"}}/> 
                <img alt = "" src="curvedarrow.png" style={{width: "50px", height: "50px",  paddingLeft: "30px", paddingRight: "20px"}}/> 
                <img alt = "" src="cashbag.png" style={{width: "80px", height: "80px"}}/> 
                </div>              
            </div>
        </div>
        </>
    )
}
import * as React from "react"
import { useState, useEffect } from "react";
import { BASE_URL } from "../constants";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";

function Listing(props){
    const post = props.post
    post.isAuthor = true
    return(
        <>
        <div style={{}}>
            <h2>{props.post.title}</h2>
            <p>{props.post.description}</p>
            <h3>{props.post.price}</h3>
            <h3>{props.post.location}</h3>
            <Link to = {`/posts/${props.post._id}`} state = {{post: post}} style={{textDecoration: "none", color: "black", border: "1px solid black", padding: "5px", borderRadius: "5px"}}>Post Options</Link>
        </div>
        <hr/>
        </>
    )
}

export default function Profile(){
    const [data, setData] = useState({})
    const myData = async () => {
        try {
          const response = await fetch(`${BASE_URL}/users/me`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          const result = await response.json();
          console.log(result);
          localStorage.setItem('id', result.data._id)
          localStorage.setItem('username', result.data.username)
          setData(result.data)
        } catch (err) {
          console.error(err);
        }
      } 
      useEffect(()=>{
        myData()
      }, []) 
    return(
        <>
        <Header/>
        <h2 style={{textTransform: "uppercase", color: "white", textShadow: "-1px 1px 0 #000", paddingLeft: "10px"}}>Active Posts</h2>
        <div style={{width: "100%", height: "350px", overflowY: "auto", overflowX: "hidden", borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px", backgroundColor: "white", margin: "10px", padding: "10px"}}>
            {Object.keys(data).length !== 0 ? data.posts.map((post) => (
                post.active ? <Listing post={post}/> : <></>
            )) : <></>}
        </div>
        <h2 style={{textTransform: "uppercase", color: "white", textShadow: "-1px 1px 0 #000", paddingLeft: "10px"}}>Received Messages</h2>
        <div style={{width: "100%", height: "350px", overflowY: "auto", overflowX: "hidden", borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px", backgroundColor: "white", margin: "10px", padding: "10px"}}>
            {Object.keys(data).length !== 0 ? data.messages.map((message) => (
                message.fromUser._id !== localStorage.getItem('id') ? <div>
                    <h3>From: {message.fromUser.username}</h3>
                    <p>{message.content}</p>
                    <h4>Post: {}</h4>
                    <p>{message.post.title}</p>
                    <hr/>
                </div> : <></>
            )) : <></>}
        </div>
        <h2 style={{textTransform: "uppercase", color: "white", textShadow: "-1px 1px 0 #000", paddingLeft: "10px"}}>Sent Messages</h2>
        <div style={{width: "100%", height: "350px", overflowY: "auto", overflowX: "hidden", borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px", backgroundColor: "white", margin: "10px", padding: "10px"}}>
        {Object.keys(data).length !== 0 ? data.messages.map((message) => (
                message.fromUser._id === localStorage.getItem('id') ? <div>
                    <h3>From: {message.fromUser.username}</h3>
                    <p>{message.content}</p>
                    <h4>Post: {}</h4>
                    <p>{message.post.title}</p>
                    <hr/>
                </div> : <></>
            )) : <></>}
        </div> 
        </>
    )
}

// 648a715e5e1a1700148286c7
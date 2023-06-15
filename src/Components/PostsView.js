import * as React from "react"
import { useState } from "react";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function PostView(){
    const deletePost = async (id) => {
        try {
          const response = await fetch(`${BASE_URL}/posts/${id}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const result = await response.json();
          console.log(result);
          return result
        } catch (err) {
          console.error(err);
        } finally {
          props.refreshPage()
        }
      }

    return(
    <div style={{width: "100%", height: "250px", border: "1px solid black"}}>
        <h2>{props.post.title}</h2>
        <p>{props.post.description}</p>
        <h3>{props.post.price}</h3>
        <h2>{props.post.author.username}</h2>
        <h3>{props.post.location}</h3>
        {props.post.isAuthor ? <div><button>Edit</button> <button onClick={()=>{deletePost(props.post._id)}}>Delete</button></div> : <button>Send Message</button>}
    </div>
    )
}
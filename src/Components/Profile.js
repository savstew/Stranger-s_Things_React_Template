import * as React from "react"
import { useState, useEffect } from "react";
import { BASE_URL } from "../constants";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";

function Listing(props){
    const [title, setTitle] = useState(props.post.title);
    const [description, setDescription] = useState (props.post.description);
    const [price, setPrice] = useState (props.post.price);
    const [sellLocation, setSellLocation] = useState (props.post.sellLocation);
    const [deliver, setDeliver] = useState (props.post.deliver);
    const [showForm, setShowForm] = useState (false);
    const navigate = useNavigate()
    const post = props.post
    post.isAuthor = true
    return(
        <>
        <div style={{width: "100%", padding: "10px", border: "1px solid black"}}>
            <h2>{props.post.title}</h2>
            <p>{props.post.description}</p>
            <h3>{props.post.price}</h3>
            <h3>{props.post.location}</h3>
            <Link to = {`/posts/${props.post._id}`} state = {{post: post}}>Post Options</Link>
        </div>
        { showForm ? 
        <div style={{border: "1px solid black"}}>
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title"></input>
                <input value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Description"></input>
                <input value={price} onChange={(event) => setPrice(event.target.value)} placeholder="Price"></input>
                <input value={sellLocation} onChange={(event) => setSellLocation(event.target.value)} placeholder="Location"></input>
                <input checked={deliver} onChange={() => setDeliver(!deliver)} type="checkbox" id="deliver"></input>
                <label for="deliver">Willing to Deliver?</label>
                <button type="submit">Submit</button>
            </form> 
        </div>
        : <></>}
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
        <h2>Active Posts</h2>
        <div style={{width: "100%", height: "350px", border: "1px solid black", overflowY: "auto", overflowX: "hidden"}}>
            {Object.keys(data).length !== 0 ? data.posts.map((post) => (
                post.active ? <Listing post={post}/> : <></>
            )) : <></>}
        </div>
        <h2>Messages</h2>
        <div style={{width: "100%", height: "350px", border: "1px solid black", overflowY: "auto", overflowX:"hidden"}}>
            {Object.keys(data).length !== 0 ? data.messages.map((message) => (
                <div style={{border: "1px solid black"}}>
                    <h3>From: {message.fromUser.username}</h3>
                    <p>{message.content}</p>
                    <h4>Post: {}</h4>
                    <p>{message.post.title}</p>
                </div>
            )) : <></>}
        </div> 
        </>
    )
}
import * as React from "react"
import { useState } from "react";
import { BASE_URL } from "../constants";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";

export default function PostView(props){
  const location = useLocation()
  const post = location.state?.post
  const [message, setMessage] = useState ('');
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState (post.description);
  const [price, setPrice] = useState (post.price);
  const [sellLocation, setSellLocation] = useState (post.sellLocation);
  const [deliver, setDeliver] = useState (post.deliver);
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState (false);
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
      navigate("/posts")
    }
  }
  const updatePost = async () => {
    try {
      // You will need to insert a variable into the fetch template literal 
      // in order to make the POST_ID dynamic. 
      // 5e8d1bd48829fb0017d2233b is just for demonstration.
      const response = await fetch(`${BASE_URL}/posts/${post._id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          post: {
            title: title,
            description: description,
            price: price,
            location: sellLocation,
            willDeliver: deliver
          }
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    } finally{navigate("/posts")}
  }
  const postMessage = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${post._id}/messages`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          message: {
            content: message
          }
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    } finally {
      setMessage("")
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    updatePost()
  }
  return(
    <>
      <Header/>
      <div style={{width: "100%", padding: "10px", border: "1px solid black"}}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <h3>{post.price}</h3>
          <h2>{post.author.username}</h2>
          <h3>{post.location}</h3>
          { post.isAuthor ? <></> : <hr/>}
          { post.isAuthor ?
          <div><button onClick={()=>{setShowForm(true)}}>Edit</button> 
          <button onClick={()=>{deletePost(post._id)}}>Delete</button></div>
          : 
          <>
            <h2>Message Seller About Listing</h2>
            <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Type here."></input>
            <button onClick={()=>{postMessage()}}>Send Message</button>
          </>}
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
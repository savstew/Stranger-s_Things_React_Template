import * as React from "react"
import { useState } from "react";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function PostsAdd(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState ('');
    const [price, setPrice] = useState ('');
    const [location, setLocation] = useState ('');
    const [deliver, setDeliver] = useState (false);
    let navigate = useNavigate()
    const makePost = async () => {
        try {
          const response = await fetch(`${BASE_URL}/posts`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              post: {
                title: title,
                description: description,
                price: price,
                location: location,
                willDeliver: deliver
              }
            })
          });
          const result = await response.json();
          console.log(result);
          return result
        } catch (err) {
          console.error(err);
        } finally {
            if(localStorage.getItem('token'))
              navigate("/posts") 
          }
      } 
      const handleSubmit = (event) => {
        event.preventDefault()
        makePost()
      } 
    return(
        <>
        <Header/>
        <h1>Add New Post</h1>
        <form onSubmit={handleSubmit}>
            <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title"></input>
            <input value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Description"></input>
            <input value={price} onChange={(event) => setPrice(event.target.value)} placeholder="Price"></input>
            <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Location"></input>
            <input checked={deliver} onChange={() => setDeliver(!deliver)} type="checkbox" id="deliver"></input>
            <label for="deliver">Willing to Deliver?</label>
            <button type="submit">Create</button>
        </form>
        </>
    )
}
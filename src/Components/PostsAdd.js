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
        <h1 style={{textTransform: "uppercase", color: "white", textShadow: "-1px 1px 0 #000", textAlign: "center"}}>Add New Post</h1>
        <div style={{display: "flex", width: "100%", height: "100%", justifyContent: "center"}}>
          <div style={{display: "flex", backgroundColor: "white", height: "200px", width: "50%", borderRadius: "8px", justifyContent: "center", marginTop: "20px", paddingTop: "20px"}}>
            <form onSubmit={handleSubmit}>
              <div style={{padding: "10px"}}>
                <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title" style={{marginRight: "10px"}}></input>
                <input value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Description" style={{marginRight: "10px"}}></input>
                <input value={price} onChange={(event) => setPrice(event.target.value)} placeholder="Price" style={{marginRight: "10px"}}></input>
                <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Location" style={{marginRight: "10px"}}></input>
              </div>
              <input checked={deliver} onChange={() => setDeliver(!deliver)} type="checkbox" id="deliver" style={{marginLeft: "40%", marginTop: "20px"}}></input>
              <label for="deliver">Willing to Deliver?</label>
              <br/>
              <button type="submit" style={{backgroundColor: "white", color: "#041f64", borderRadius: "5px", border: "1px solid #041f64", width: "150px", height: "35px", marginLeft: "40%", marginTop: "20px"}}>Create</button>
            </form>
          </div>
          </div>
        </>
    )
}
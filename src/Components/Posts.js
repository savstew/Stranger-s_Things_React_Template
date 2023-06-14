import * as React from "react"
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants";

function Post(props){
    return(
    <div style={{width: "100%", height: "250px", border: "1px solid black"}}>
        <h2>{props.post.title}</h2>
        <p>{props.post.description}</p>
        <h3>{props.post.price}</h3>
        <h2>{props.post.author.username}</h2>
        <h3>{props.post.location}</h3>
        <button></button>
    </div>
    )
}

export default function Posts(){
    const [posts, setPosts] = useState({})
    const fetchPosts = async () => {
        try {
          const response = await fetch(`${BASE_URL}/posts`)
      
          const result = await response.json();
          console.log(result);
          setPosts(result) 
        } catch (err) {
          console.error(err);
        }
      }
      useEffect(()=>{
        if(Object.keys(posts).length === 0){
            fetchPosts()
            console.log(posts)
        }
      }, [])
    return(
        <>
            {Object.keys(posts).length !== 0 ?
                posts.data.posts.map((item)=>(
                    <Post post={item}/>
                ))
             : "NO POSTS"}
        </>
    )
}
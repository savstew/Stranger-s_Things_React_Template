import * as React from "react"
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

function Post(props){
    return(
    <div style={{width: "100%", height: "250px", border: "1px solid black"}}>
        <h2>{props.post.title}</h2>
        <p>{props.post.description}</p>
        <h3>{props.post.price}</h3>
        <h2>{props.post.author.username}</h2>
        <h3>{props.post.location}</h3>
        {props.post.isAuthor ? <div><Link to = {`/posts/${props.post._id}`} state = {{post: props.post}}>View</Link></div> : 
        <Link to = {`/posts/${props.post._id}`} state = {{post: props.post}}>Send Message</Link>}
    </div>
    )
}

export default function Posts(){
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  function postMatches(post, text) {
    return post.title.toLowerCase().includes(text.toLowerCase()) || post.author.username.toLowerCase().includes(text.toLowerCase())
  }

  const filteredPosts = posts.filter(post => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

// then, in our jsx below... map over postsToDisplay instead of posts
    const fetchPosts = async () => {
        try {
          let response = ''
          if (localStorage.getItem('token')){
            response = await fetch(`${BASE_URL}/posts`, {
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            })
          } else {response = await fetch(`${BASE_URL}/posts`)}
          const result = await response.json();
          console.log(result);
          setPosts(result.data.posts) 
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
          <Header/>
          <h1>Posts</h1>
          <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}></input>
          <Link to={"/posts/add"}>(Add Post)</Link>
            {posts.length !== 0 ?
                postsToDisplay.map((item)=>(
                    <Post post={item} refreshPage = {fetchPosts}/>
                ))
             : "NO POSTS"}
        </>
    )
}
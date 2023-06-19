import * as React from "react"
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

function Post(props){
    return(
    <div style={{width: "98%", height: "250px", borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px", backgroundColor: "white", margin: "10px", padding: "10px"}}>
        <h2 style={{marginTop: "0px", marginBottom: "5px"}}>{props.post.title}</h2>
        <hr/>
        <p>{props.post.description}</p>
        <h3>{props.post.price}</h3>
        <h2>{props.post.author.username}</h2>
        <h3>{props.post.location}</h3>
        {localStorage.getItem('token') ? props.post.isAuthor ? <div><Link to = {`/posts/${props.post._id}`} state = {{post: props.post}}  style={{textDecoration: "none", color: "black", border: "1px solid black", padding: "5px", borderRadius: "5px"}}>
          View</Link></div> : 
        <Link to = {`/posts/${props.post._id}`} state = {{post: props.post}} style={{textDecoration: "none", color: "black", border: "1px solid black", padding: "5px", borderRadius: "5px"}}>
          Send Message</Link> : <></>}
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
          <h1 style={{textTransform: "uppercase", color: "white", textShadow: "-1px 1px 0 #000", textAlign: "center"}}>Posts</h1>
          <div style={{marginLeft: "10px"}}>
          <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} style={{width: "300px", height: "20px"}}></input>
            {localStorage.getItem('token') ? <Link to={"/posts/add"} style={{backgroundColor: "white", textDecoration: "none", color: "black", border: "1px solid black", marginLeft: "10px", padding: "5px", borderRadius: "5px"}}>
              Add Post
            </Link> : <></>}
          </div>
            {posts.length !== 0 ?
                postsToDisplay.map((item)=>(
                    <Post post={item} refreshPage = {fetchPosts}/>
                ))
             : "NO POSTS"}
        </>
    )
}
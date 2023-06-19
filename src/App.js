import "./App.css";
import {Route, Routes, Outlet} from 'react-router-dom';
import Posts from "./Components/Posts";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import PostsAdd from "./Components/PostsAdd";
import PostView from "./Components/PostsView";
import Profile from "./Components/Profile";
import Home from "./Components/Home";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Home/>}/>
      <Route path={"/posts"} element={<Posts/>}/>
      <Route path={"/login"} element={<Login/>}/>
      <Route path={"/signup"} element={<Signup/>}/>
      <Route path={"/posts/add"} element={<PostsAdd/>}/> 
      <Route path={"posts/:id"} element= {<PostView/>}/>
      <Route path={"/profile"} element= {<Profile/>}/>
    </Routes>
  );
}

export default App;

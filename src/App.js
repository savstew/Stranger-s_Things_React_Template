import "./App.css";
import {Route, Routes } from 'react-router-dom';
import Posts from "./Components/Posts";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {
  return (
    <>
    <Routes>
      <Route path={"/"} element={<div>HELLO LANDING PAGE</div>}/>
      <Route path={"/posts"} element={<Posts />}/>
      <Route path={"/login"} element={<Login />}/>
      <Route path={"/signup"} element={<Signup />}/>
    </Routes>
    </>
  );
}

export default App;

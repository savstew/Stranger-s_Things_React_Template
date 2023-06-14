import "./App.css";
import {Route, Routes } from 'react-router-dom';
import Posts from "./Components/Posts";
function App() {
  return (
    <>
    <Routes>
      <Route path={"/"} element={<div>HELLO LANDING PAGE</div>}/>
      <Route path={"/posts"} element={<Posts />}/>
    </Routes>
    </>
  );
}

export default App;

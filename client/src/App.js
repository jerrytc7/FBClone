import './App.css';
import React from 'react';
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import PostList from './components/PostList';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
// import video from './assets/shootingstar.mp4'


function App() {
  return (
    <HashRouter>
      <video preload="auto" autoPlay muted loop className='background'>
        <source src="/assets/shootingstar.mp4" type='video/mp4'/>
      </video>
      <div className='app'>
        <div className='navbar'>
          <a href="/users/sign_out">Log out</a>
        </div>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<PostList />} />
            <Route exact path="/posts/new" element={<NewPost />} />
            <Route exact path="/posts/edit/:id" element={<EditPost />} />
          </Routes>
        </div>
      </div>


    </HashRouter>
  );
}

export default App;

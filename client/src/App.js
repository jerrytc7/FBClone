import './App.css';
import React from 'react';
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import PostList from './components/PostList';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import Cookies from 'js-cookie';
// import video from './assets/shootingstar.mp4'

function Guest() {
  return (
    <div>
      <nav style={{textAlign: "right"}}>
        <a href="/users/sign_in">Login</a> | <a href="/users/sign_up">Sign Up</a>
      </nav>

      <h1>Welcome to the Home Page</h1>
      <p> Please <a href="/users/sign_in">log in</a> to continue!</p>
    </div>

  )
}


function App() {
  let isLoggedIn = false;
  const user = Cookies.get("username")
  if (user === "guest" || user === "" || user === undefined){
    isLoggedIn = false;
  }else {
    isLoggedIn = true;
  }
  if (isLoggedIn) {
    return (
      <HashRouter>
        <h1 id="test">test react</h1>
        <video poster="/assets/poster.png" preload="auto" autoPlay muted loop className='background'>
          <source src="/assets/movingbooks.mp4" type='video/mp4' />
        </video>
        <div className='app'>
          <div className='navbar'>
            <a onClick={handleLogout}>Log out</a>
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

  return <Guest />
}

function handleLogout(e) {
  e.preventDefault()
  Cookies.remove("username")
  window.location.href = "/users/sign_out"
}

export default App;

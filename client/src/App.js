import './App.css';
import React from 'react';
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import PostList from './components/PostList';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import AllPostList from './components/AllPostList';
import { getUser, removeUser } from './lib/auth';

// import video from './assets/shootingstar.mp4'

function Guest() {
  return (
    <div>
      <nav>
        <h3>PostApp</h3>
        <div>
          <a href="/users/sign_in">Login</a> | <a href="/users/sign_up">Sign Up</a>
        </div>
      </nav>

      <header>
        <h1>Welcome to the Home Page</h1>
        <p> Please <a href="/users/sign_in">log in</a> to continue!</p>
      </header>
    </div>

  )
}


function App() {
  let isLoggedIn = false;
  const user = getUser();
  
  if (user === "guest" || user === "" || user === undefined) {
    isLoggedIn = false;
  } else {
    isLoggedIn = true;
  }

  if (isLoggedIn) {
    return (
      <HashRouter>
        <video poster="/assets/poster.png" preload="auto" autoPlay muted loop className='background'>
          <source src="/assets/movingbooks.mp4" type='video/mp4' />
        </video>
        <div className='app'>
          <div className='navbar'>
            <div className='navbarlinks'>
              <Link to="/posts/all">View Posts From All Users</Link>
              <Link to="/">View Posts From Current User</Link>
            </div>
            <div className='navbarlogout'>
              <a onClick={handleLogout}>Log out</a>
            </div>
          </div>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<PostList />} />
              <Route exact path="/posts/new" element={<NewPost />} />
              <Route exact path="/posts/edit/:id" element={<EditPost />} />
              <Route exact path="/posts/all" element={<AllPostList />} />
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
  removeUser()
  window.location.href = "/users/sign_out"
}

export default App;

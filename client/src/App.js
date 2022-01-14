import './App.css';
import React from 'react';
import {HashRouter, Routes, Route} from "react-router-dom";
import PostList from './components/PostList';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';


function App() {
  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<PostList />}/>
          <Route exact path="/posts/new" element={<NewPost />}/>
          <Route exact path="/posts/edit/:id" element={<EditPost />}/>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;

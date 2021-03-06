import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './postList.css'
import {PostListItem} from "./PostList"
import { getUser } from '../lib/auth';

function PostList() {
    const [posts, setPosts] = useState([])

    const currentUser = getUser()

    useEffect(() => {
        fetch("api/v1/posts?all=true")
            .then(posts => posts.json())
            .then(posts => {
                console.log("posts", posts);
                setPosts(posts)
            }).catch(err=>console.log)
    }, [])

    return (
        <div className='primary'>
            <Link to="/posts/new">Add a New Post</Link>
           <p>Posts From All Users:</p>
            <div className='list'>
            {posts.length > 0 && posts.map(post => <PostListItem {...post} key={post.id} currentUser={currentUser} />)}
            </div>
        </div>
    )
}

export default PostList

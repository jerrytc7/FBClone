import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { getUser } from '../lib/auth';
import './postList.css'

function PostList() {
    const [posts, setPosts] = useState([])

    const currentUser = getUser()

    useEffect(() => {
        fetch("api/v1/posts")
            .then(posts => posts.json())
            .then(posts => {
                console.log("posts", posts);
                setPosts(posts)
            }).catch(err => console.log)
    }, [])

    return (
        <div className='primary'>
            <Link to="/posts/new">Add a New Post</Link>
            <p>Posts You've Made!</p>
            <div className='list'>
                {posts.length > 0 && posts.map(post => <PostListItem {...post} key={post.id} currentUser={currentUser} />)}
            </div>
        </div>
    )
}

export const PostListItem = ({ id, title, content, user: { email }, currentUser }) => {
    return (
        // <div>
        //     <Link to={"/posts/edit/" + id}>
        //         <div>
        //             {title} - {content}
        //         </div>
        //         <div>
        //             {email}
        //         </div>
        //     </Link>
        // </div>
        <div className='item'>
            <div className='head'>
                {currentUser === email ? <Link to={"/posts/edit/" + id}>{title}</Link> : title}
            </div>
            <div className='body'>
                {content}
            </div>
            <div className='foot'>
                {email}
            </div>
        </div>
    )
}

export default PostList

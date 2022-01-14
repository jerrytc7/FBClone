import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import './postList.css'

function PostList() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch("api/v1/posts")
            .then(posts => posts.json())
            .then(posts => {
                setPosts(posts)
            })
    }, [])

    return (
        <div className='primary'>
            Posts:
            {posts.map(post => <PostListItem {...post} key={post.id}/>)}
            <Link to="/posts/new">Add a New Post</Link>
        </div>
    )
}

function PostListItem({id,title,content}){
    return (
        <div>
        <Link to={"/posts/edit/"+id}>
          {title} - {content}
        </Link>
        </div>
      )
}

export default PostList

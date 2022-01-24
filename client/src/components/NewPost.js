import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './postList.css'

function NewPost() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate()

    const handleChange = e => {
        let newValue = e.target.value;
        let key = e.target.name;
        switch (key) {
            case "title":
                setTitle(newValue)
                break
            case "content":
                setContent(newValue)
                break
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let token = document.querySelector('meta[name="csrf-token"]');
        if (token) { token = token.content }
        fetch('api/v1/posts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-Token': token
            },
            redirect: "error",
            body: JSON.stringify({
                title, content
            })
        })
            .then(post => {
                navigate("/")
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>
                <label htmlFor="title">Title: </label>
                <input className='title' type="text" name="title" onChange={handleChange} />
            </p>
            <p>
                <label htmlFor="content">Content: </label>
                <textarea name="content" id="" cols="30" rows="10" onChange={handleChange}></textarea>
            </p>
            <input className='create' type="submit" value="Create Post" />
        </form>
    )
}

export default NewPost

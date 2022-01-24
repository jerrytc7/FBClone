import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './postList.css'

function EditPost() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate()
    const params = useParams()

    useEffect( () => {
        fetch("/api/v1/posts/"+params.id)
            .then(res => res.json())
            .then(data => {
                console.log(data.title)
                setTitle(data.title)
                setContent(data.content)
            })
    },[params.id])

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
        let token = document.querySelector('meta[name="csrf-token"]').content;
        fetch('api/v1/posts/'+params.id, {
            method: 'PUT',
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

    const handleDeletion = () => {
        let token = document.querySelector('meta[name="csrf-token"]').content;
        fetch('api/v1/posts/'+params.id, {
            method: "DELETE",
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-Token': token
            },
            redirect: "error",
        })
        .then(post => {
            navigate("/")
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>
                <label htmlFor="title">Title: </label>
                <input className='title' type="text" name="title" onChange={handleChange} value={title}/>
            </p>
            <p>
                <label htmlFor="content">Content: </label>
                <textarea name="content" id="" cols="30" rows="10" onChange={handleChange} value={content}></textarea>
            </p>
            <button className='create' type="submit">Save Post</button>
            <button className='create' type='button' onClick={handleDeletion}>Delete Post</button>
        </form>
    )
}

export default EditPost

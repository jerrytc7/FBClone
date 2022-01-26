import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './postList.css'

function NewPost() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate()

    const [errors, setErrors] = useState({})

    const handleChange = e => {
        let newValue = e.target.value;
        let key = e.target.name;
        switch (key) {
            case "title":
                setErrors((state) => {
                    return (state.title) ? { content: state.content } : state
                })
                setTitle(newValue)
                break
            case "content":
                setErrors((state) => {
                    return (state.content) ? { title: state.title } : state
                })
                setContent(newValue)
                break
        }
    }

    // react-final-form
    // formik

    const handleSubmit = (e) => {
        e.preventDefault();
        let token = document.querySelector('meta[name="csrf-token"]');
        if (token) { token = token.content }
        // fetch('api/v1/posts', {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json",
        //         'X-Requested-With': 'XMLHttpRequest',
        //         'X-CSRF-Token': token
        //     },
        //     redirect: "error",
        //     body: JSON.stringify({
        //         title, content
        //     })
        // })
        axios.post('/api/v1/posts', { title, content }, { headers: {
            "Content-Type": "application/json",
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-Token': token
         }})
        .then(post => {
            navigate("/")
        })
        .catch((e) => {
            if (e.response.status === 422) {
               setErrors(e.response.data)
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>
                <label htmlFor="title">Title: </label>
                <input className='title' type="text" name="title" onChange={handleChange} />
                {errors.title?.map((error) => <div>{`Title ${error}`}</div>)}
            </p>
            <p>
                <label htmlFor="content">Content: </label>
                <textarea name="content" id="" cols="30" rows="10" onChange={handleChange}></textarea>
                {errors.content?.map((error) => <div>{`Content ${error}`}</div>)}
            </p>
            <input className='create' type="submit" value="Create Post" />
        </form>
    )
}

export default NewPost

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import './postList.css'

function EditPost() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate()
    const params = useParams()


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


    useEffect( () => {
        fetch("/api/v1/posts/"+params.id)
            .then(res => res.json())
            .then(data => {
                console.log(data.title)
                setTitle(data.title)
                setContent(data.content)
            })
    },[params.id])


    const handleSubmit = (e) => {
        e.preventDefault();
        let token = document.querySelector('meta[name="csrf-token"]').content;
        // fetch('api/v1/posts/'+params.id, {
        //     method: 'PUT',
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
        //     .then(post => {
        //         navigate("/")
        //     });

            axios.put('/api/v1/posts/' + params.id, { title, content }, { headers: {
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
                {errors.title?.map((error) => <div>{`Title ${error}`}</div>)}
            </p>
            <p>
                <label htmlFor="content">Content: </label>
                <textarea name="content" id="" cols="30" rows="10" onChange={handleChange} value={content}></textarea>
                {errors.content?.map((error) => <div>{`Content ${error}`}</div>)}
            </p>
            <button className='create' type="submit">Save Post</button>
            <button className='create' type='button' onClick={handleDeletion}>Delete Post</button>
        </form>
    )
}

export default EditPost

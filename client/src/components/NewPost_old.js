import React, { Component }               from 'react'
import { useNavigate } from 'react-router-dom';

class NewPost extends Component {

  state = {
    title: '',
    content: ''
  }

  handleChange = e => {
    let newValue = e.target.value;
    let key = e.target.name;
    this.setState({
      [key]: newValue
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let data = {post: this.state};
    let token = document.querySelector('meta[name="csrf-token"]').content;
    fetch('api/v1/posts', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': token
      },
      redirect: "error",
      body: JSON.stringify(this.state)
    })
      .then(resp => {
        resp.json()
      })
      .then(post => {
        console.log(this.props)
        this.props.navigate('/')
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <p>
          <label htmlFor="title">Title: </label>
          <input type="text" name="title" onChange={this.handleChange} />
        </p>
        <p>
          <label htmlFor="content">Content: </label>
          <textarea name="content" id="" cols="30" rows="10" onChange={this.handleChange}></textarea>
        </p>
        <input type="submit" value="Create Post" />
      </form>
    )
  }
}

export default NewPost
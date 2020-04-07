import React, { Component } from 'react';
import axios from 'axios';
import {Redirect } from 'react-router-dom';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'MJ',
        submitted: false
    }
     //Bloquear los accesorios.
    componentDidMount () {
        console.log(this.props);
    }
    //Para el botton de add Post. Para poder agregar un nuevo post
    postDataHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        } // esto es para decir que queremos que nos imprima estos valores. y luego se lo pasamos la const como parametro a la url que hacemos la peticion a la api.
        axios.post('/posts', data)
        .then(response => {
            console.log(response);
            this.props.history.push('/posts'); // history estamos accediendo al historial del soporte del disco y de ahi un metodo de insercion ques es el push.
            //this.setState({ submitted: true});
        }); //POST

    }

    render () {

        /* Conditional redirect. Cuando haces un nuevo post te redirecciona a la ruta /posts */
        let redirect = null;
        if (this.state.submitted) {
            redirect = <Redirect to="/posts" />

        }

        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="MJ">M.J</option>
                    <option value="CRIS">CRIS </option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;
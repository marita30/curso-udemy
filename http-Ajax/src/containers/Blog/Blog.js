import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: []

    }

  /*   Le decimos al que una vez que se carge este contenedor muestre la informacion en la direccion que le declaramos axios.get */
    componentDidMount (){

        axios.get('http://jsonplaceholder.typicode.com/posts')
            .then(response => {
                this.setState({posts: response.data}); /* delcaramos un estado que le decimos que la variable declarada en el state que se llama posts: contenga la informacion de data que seria el arreglo con los hashes que nos da la url de axios.get */
                //console.log(response);
            }); /* esto es igual a decir const respose = axios.get('http://jsonplaceholder.typicode.com/posts') y luego console.log(response) y luego vas a verificar a la console la informacion que trae de la api. */

    }
    render () { 
        const posts = this.state.posts.map( post => { 
            return <Post title = {post.title}/>     
        });
        return (
            <div>
                <section className="Posts">
                    {posts} {/* viene del const posts. */}
                </section>
                <section>
                    <FullPost />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
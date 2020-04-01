import React, { Component } from 'react';
//import axios from 'axios';
import axios from '../../Axios';    

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null

    }

  /*   Le decimos al que una vez que se carge este contenedor muestre la informacion en la direccion que le declaramos axios.get */
    componentDidMount (){

        axios.get('/posts') // GET
            .then(response => {
                const posts  = response.data.slice(0, 4); /* le decimos que queremos que solo nos muestre desde el 0 al 4 elementos  y lo guardamos en una nueva variable llamada posts*/
                const updatePosts = posts.map(post => { /*  luego mandamos a actualizar la nuava variable llamada posts lo mapeamos y luego en el return mandamos a reestructurar la informacion agregandole un author. */
                    return{
                        ...post,
                        author: "MJ <3"
                    }
                });
                this.setState({posts: updatePosts}); /* declaramos un estado para la variable posts del state y le pasamos lo que tiene la variable updatePosts. */
                //console.log(response);
        })/* esto es igual a decir const respose = axios.get('http://jsonplaceholder.typicode.com/posts') y luego console.log(response) y luego vas a verificar a la console la informacion que trae de la api. */
        .catch (error => {
            console.log(error);
        });
    }

    /* Para hacer click a cada una de los posts individuales. */

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id}); /* selectedPostId recibe como parametro el id */


    }


    render () { 
        const posts = this.state.posts.map( post => { 
            return <Post  
                key= {post.id}  
                clicked = {() => this.postSelectedHandler(post.id)}
                title = {post.title} 
                author= {post.author}
           />;  
        } );
        return (
            
            <div className="Blog">
                {/* //Routind -- diferentes pages. */}
                <header>
                    <nav>
                        <ul>
                            <li><a href="/">HOME</a></li>
                            <li><a href="/new-post">NEW POST</a></li>
                        </ul>
                    </nav>
                </header>
                <section className="Posts">
                    {posts} {/* viene del const posts. */}
                </section>
                <section>
                    <FullPost  id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
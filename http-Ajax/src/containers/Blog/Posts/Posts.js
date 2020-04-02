import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';

/* import classes from './Posts.css'; */

class Posts extends Component {

    state = {

        posts: []
    }

     /*   Le decimos al que una vez que se carge este contenedor muestre la informacion en la direccion que le declaramos axios.get */
     componentDidMount (){

         //Bloquear los accesorios.
         console.log(this.props);

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
            //this.setState({error: true});
        });
    }


     /* Para hacer click a cada una de los posts individuales. */
    postSelectedHandler = (id) => {

        this.setState({selectedPostId: id}); /* selectedPostId recibe como parametro el id */

    }

    render(){

        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>
        if (!this.state.error){
            posts = this.state.posts.map (post => {
                return <Post  
                    key= {post.id}  
                    title = {post.title} 
                    author= {post.author}
                    clicked = {() => this.postSelectedHandler(post.id)}
                />;

            })
        } 
              
        return(
            <section className="Posts">
                {posts} {/* viene del const posts. */}
            </section>

        );
    }

}

 


export default Posts;
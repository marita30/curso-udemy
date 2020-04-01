import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {

    state = {

        loadedPosts: null
    }

    /* gancho de ciclo de vida  */
    componentDidUpdate () {
        if (this.props.id){ //le decimos que queremos que el id sea verdaero.)
            if (!this.state.loadedPosts || (this.state.loadedPosts && this.state.loadedPosts.id !== this.props.id)){ //Verificamos si loadedPosts es true luego le decimos && loadedPosts.id es igual al props.id qe imprima el bloque.
                axios.get('/posts/' + this.props.id) /* GET /posts/1 */ /* hacemos peticion a la api */
                .then(response =>  {
                    console.log(response)
                    /* console.log(response); */ /* Para ver la data en la console. */
                    this.setState({loadedPosts: response.data});
                });   
            }
            
        }
    }

    //ELiminar un posts.
    deletePostHandler = () => {

        axios.delete('/posts/' + this.props.id)
        .then(response => {
            console.log(response);
        });

    }

    render () {

        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;

        if (this.props.id){
            post = <p style={{textAlign: 'center'}}>Loading...!</p>;
        }

        if (this.state.loadedPosts) {  /* si this.state.loadedPosts es false o null no entra al bloque pero si es true entra a este bloque. viene del archivo blog.js*/

            post = (
                <div className="FullPost">
                    <h1> {this.state.loadedPosts.title} </h1>
                    <p> {this.state.loadedPosts.body } </p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
    
            );

        }
        
        return post;
    }
}

export default FullPost;
import React, { Component } from 'react';
//import axios from 'axios';  
import { Route, Link } from 'react-router-dom';
import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';

class Blog extends Component {
    render () { 
        return (
            
            <div className="Blog">
                {/* //Routind -- diferentes pages. */}
                <header>
                    <nav>
                        <ul>
                            <li><Link to="/">HOME</Link></li>
                            <li><Link to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>NEW POST</Link></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route  path="/" exact render={() => <h1>HOME</h1>}/> */} {/* exact es un props booleano, tan solo agregarlo asi lo establece como verdadero y predeterminado es falso. */}
                <Route path="/" exact  component={Posts}/> {/* Ya no vamos a  usar render, ahora usaremos component que deberia representarse en el lugar de esta ruta. POr ejemplo aqui le decimos que muestre todos los Posts. */}
                <Route path="/new-post" component={NewPost}/>
            </div>
        );
    }
}

export default Blog;
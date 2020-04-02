import React, { Component } from 'react';
//import axios from 'axios';  
import { Route } from 'react-router-dom';
import './Blog.css';
import Posts from './Posts/Posts';

class Blog extends Component {
    render () { 
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
                <Route  path="/" exact render={() => <h1>HOME</h1>}/> {/* exact es un props booleano, tan solo agregarlo asi lo establece como verdadero y predeterminado es falso. */}
            </div>
        );
    }
}

export default Blog;
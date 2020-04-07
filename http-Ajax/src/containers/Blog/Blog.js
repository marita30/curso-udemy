import React, { Component } from 'react';
//import axios from 'axios';  
import { Route, NavLink, Switch, Redirect} from 'react-router-dom';
import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';


class Blog extends Component {

    /* Route of guards */
    state = {
        auth: false
    }
    render () { 
        return (
            
            <div className="Blog">
                {/* //Routind -- diferentes pages. */}
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                                to="/posts/" 
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Posts</NavLink></li>
                                
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>NEW POST</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route  path="/" exact render={() => <h1>HOME</h1>}/> */} {/* exact es un props booleano, tan solo agregarlo asi lo establece como verdadero y predeterminado es falso. */}
               
                <Switch>
                    {this.state.auth ? <Route path="/new-post" component={NewPost} /> : null };
                    <Route path="/posts"  component={Posts}/> {/* Ya no vamos a  usar render, ahora usaremos component que deberia representarse en el lugar de     esta ruta. POr ejemplo aqui le decimos que muestre todos los Posts. */} 
                    <Redirect from="/" to="/posts" /> {/* Para redireccionar al usuario. */}
                   {/*  <Route path="/"  component={Posts}/> */}
                </Switch>  {/* //Solo carga una de las rutas  */}
     
            </div> 
        );
    }
}

export default Blog;
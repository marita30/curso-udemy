import React from 'react';
//Es para que los props se publiquen para las publicaciones individuales , tienen una ubicacion de historial y una propiedad de coincidencia.
import { withRouter } from 'react-router-dom';

import './Post.css';

const post = (props) => {
    console.log(props)
    return (
        <article className="Post" onClick={props.clicked}> {/* viene del archivo Bog.js */}
            <h1>{props.title}</h1> {/* el props.title viene del archivo Blog.js */}
            <div className="Info">
                <div className="Author">{props.author}</div> {/* viene del archivo Bog.js */}
            </div>
        </article>
    );
};

export default withRouter(post);
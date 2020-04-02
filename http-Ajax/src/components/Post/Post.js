import React from 'react';

import './Post.css';

const post = (props) => (
    <article className="Post" onClick={props.clicked}> {/* viene del archivo Bog.js */}
        <h1>{props.title}</h1> {/* el props.title viene del archivo Blog.js */}
        <div className="Info">
            <div className="Author">{props.author}</div> {/* viene del archivo Bog.js */}
         </div>
    </article>
);

export default  post;
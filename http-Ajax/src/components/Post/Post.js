import React from 'react';

import './Post.css';

const post = (props) => (
    <article className="Post">
        <h1>{props.title}</h1> {/* el props.title viene del archivo Blog.js */}
        <div className="Info">
            <div className="Author">Author</div>
        </div>
    </article>
);

export default post;
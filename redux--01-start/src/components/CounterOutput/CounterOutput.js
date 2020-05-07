import React from 'react';

import './CounterOutput.css';

const counterOutput = (props) => (
    <div className="CounterOutput">
        Current Counter: {props.value} {/* viene del archivo counter.js */}
    </div>
);

export default counterOutput;
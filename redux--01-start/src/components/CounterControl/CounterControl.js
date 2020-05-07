import React from 'react';

import './CounterControl.css';

const counterControl = (props) => (
    <div className="CounterControl" onClick={props.clicked}> {/* viene del archivo counter.js */}
        {props.label} {/* viene del archivo counter.js */}
    </div>
);

export default counterControl;
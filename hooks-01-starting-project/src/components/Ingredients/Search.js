import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  /* El enteredFilter es el que obtiene el valor y setEnteredFilter es el que cambia el valor.*/
  const [enteredFilter, setEnteredFilter] = useState('');


  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input 
            type="text" 
            value={enteredFilter} 
            onChange={event => setEnteredFilter(event.target.value)} 
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;

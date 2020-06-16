import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const { onLoadIngredients } = props;
  /* El enteredFilter es el que obtiene el valor y setEnteredFilter es el que cambia el valor.*/
  const [enteredFilter, setEnteredFilter] = useState('');

  /* SE EJECUTARA CUANDO EL FILTRO INGRESADO CAMBIE */
  useEffect(() => {

    /* Si la longitud del filtro ingresada es igual a cero entonces mi periodo de consulta no sera nada. `?` interpolacion de cadenas para inyectar valores dinamicos. */
    const query = 
      enteredFilter.length === 0 
      ? '' 
      : `?orderBy="title"&equalTo="${enteredFilter}"`;

    fetch('https://react-hooks-562ed.firebaseio.com/ingredients.json' + query).then(
          response => response.json()
      ).then(responseData => {
          const loadedIngredients = [];
          for (const key in responseData) {
            loadedIngredients.push({
              id: key,
              title: responseData[key].title,
              amount: responseData[key].amount
            });
          }
          onLoadIngredients(loadedIngredients) /* viene del archivo Ingredients.js */
      });
  }, [enteredFilter, onLoadIngredients]);

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

import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
                      /* Esto ahora lo pasa como un arreglo */ 
  /* [] esta es una sisntaxis de javascript que permite extraer elementos del arreglo {title, amount} inputState sera para obtener los datos y setINputState para actualizar los datos.*/                    
 const [ inputState, setInputState ] = useState({title: '', amount: ''});


  const submitHandler = event => {
    event.preventDefault();
    // ...
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
                                                                                                  
            <input 
              type="text" 
              id="title" 
              value={inputState.title} 
              /* ACtualiza title con los valores  target.value que son los que son ingresados por el usuario. () => le decimos que ese seria el cuerpo de la funcion y este es en realidad el valor de retorno.
              prevInputState es el valor anterior  */
              onChange={event => {
                const newTitle = event.target.value;                
                  setInputState(prevInputState => ({
                  title: newTitle, 
                  amount: prevInputState.amount
                  }));
                }}
            />
          </div>

          <div className="form-control">
            <label htmlFor="amount">Amount</label>
                                                                                                       
            <input 
              type="number" 
              id="amount" 
              value={inputState.amount}
              /* ACtualiza amount con los valores target.value que son los que son ingresados por el usuario. () => le decimos que ese seria el cuerpo de la funcion y este es en realidad el valor de retorno. */
              onChange={event => {
                const newAmount = event.target.value;
                setInputState(prevInputState => ({
                amount: newAmount, 
                title: prevInputState.title
              }));
             }}
            />
          </div>
          
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;

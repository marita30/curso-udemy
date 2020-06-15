import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  /* Esto ahora lo pasa como un arreglo */
 const inputState = useState({title: '', amount: ''});


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
              value={inputState[0].title} 
              /* ACtualiza title con los valores  target.value que son los que son ingresados por el usuario. () => le decimos que ese seria el cuerpo de la funcion y este es en realidad el valor de retorno.
              prevInputState es el valor anterior  */
              onChange={event => {
                const newTitle = event.target.value;                
                  inputState[1](prevInputState => ({
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
              value={inputState[0].amount}
              /* ACtualiza amount con los valores target.value que son los que son ingresados por el usuario. () => le decimos que ese seria el cuerpo de la funcion y este es en realidad el valor de retorno. */
              onChange={event => {
                const newAmount = event.target.value;
                inputState[1](prevInputState => ({
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

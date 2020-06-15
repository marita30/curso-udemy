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
                                                                                                  {/* ACtualiza title con los valores  target.value que son los que son ingresados por el usuario. */}
            <input type="text" id="title" value={inputState[0].title} onChange={event => inputState[1]({title: event.target.value, amount: inputState[0].amount})} />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
                                                                                                        {/* ACtualiza amount con los valores target.value que son los que son ingresados por el usuario. */}
            <input type="number" id="amount" value={inputState[0].amount} onChange={event => inputState[1]({amount: event.target.value, title: inputState[0].title})} />
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

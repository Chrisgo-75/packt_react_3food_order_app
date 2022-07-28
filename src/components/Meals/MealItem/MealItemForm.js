import { useRef, useState } from 'react';

import Input from "../../UI/Input";
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  // Control if this form is valid or not.
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    // Prevent browser from reloading the page.
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    // Convert string number to a number.
    const enteredAmountNumber = +enteredAmount;

    // Validation
    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
      // IF either of these conditions are met, wish to return and not continue with this
      // function execution.
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: 'amount',
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1'
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
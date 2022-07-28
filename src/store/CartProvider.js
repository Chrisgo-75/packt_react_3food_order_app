// Due to complex State logic will use useReducer instead of useState.
import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0
};

// Creating cartReducer OUTSIDE of the CartProvider component b/c
// a. cartReducer doesn't need anything from within CartProvider component.
// b. and cartReducer shouldn't be re-created all the time when CartProvider
//    component is re-evaluated.
const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    // concat (JS) adds new item to an Array and returns a new array.
    // vs push (JS) edits existing array.
    // So you want to create a new array instead of editing the old array in memory.
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  return (defaultCartState);
};


const CartProvider = (props) => {
  // Call React Hook "useReducer()"
  // useReducer returns an Array with 2 elements.
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({type: 'ADD', item: item});
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type: 'REMOVE', id: id});
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
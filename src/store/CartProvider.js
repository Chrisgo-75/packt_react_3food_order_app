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
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

    // Return item's index if it exists.
    // findIndex() to return TRUE if item.id === action.item.id
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
    // Get existing-cart-item by reaching out to state.items[]
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // concat (JS) adds new item to an Array and returns a new array.
      // vs push (JS) edits existing array.
      // So you want to create a new array instead of editing the old array in memory.
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  if (action.type === 'REMOVE') { console.log('Need to code up removing item.'); };
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
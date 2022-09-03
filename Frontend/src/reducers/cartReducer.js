import { ADD_TO_CART } from '../helper';

const Initial_state = {
  cartItems: [],
};

export const cartReducer = (state = Initial_state, action) => {
  switch (action?.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: action?.payload,
      };
    default:
      return state;
  }
};

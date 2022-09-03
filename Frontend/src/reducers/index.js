import { combineReducers } from 'redux';


import { productReducer } from './productReducer';

import { profileCategoriesReducer } from './profileCategoriesReducer';

import { ItemQtyReducer } from './ItemQtyReducer';

import { cartReducer } from './cartReducer';

import { selectionReducer } from './selectionReducer';

import { displayReducer } from './displayReducer';

import {authReducer} from "./accountReducer/authReducer";


import {paymentReducer} from "./paymentReducer";


const rootReducer = combineReducers({

  productReducer,

  profileCategoriesReducer,

  ItemQtyReducer,

  cartReducer,

  selectionReducer,

  displayReducer,

  /*..........Account Reducer..........*/

  authReducer,
  paymentReducer


});


export default rootReducer;



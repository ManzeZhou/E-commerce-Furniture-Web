import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FETCH_ALL_PRODUCT,
  FETCH_CATEGORIES_ARRAY,
  FETCH_ITEM_QTY,
  FETCH_PRO_ID,
  FETCH_TOTAL_PRICE,
  ADD_TO_CART,
  FETCH_SELECTION,
  FETCH_SELECTION_PRICE,
  FETCH_SELECTION_CHECKED,
  FETCH_GRID_DISPLAY,
} from '../helper';

export const swatchColors = [
  {
    id: 'swatch-color-1',
    imgUrl:
      'https://s7d2.scene7.com/is/image/HermanMillerStore/s_frame_studio_white_mineral',
    alt: 'white mineral',
  },
  {
    id: 'swatch-color-2',
    imgUrl: 'https://s7d2.scene7.com/is/image/HermanMillerStore/s_frame_canyon',
    alt: 'canyon',
  },
  {
    id: 'swatch-color-3',
    imgUrl: 'https://s7d2.scene7.com/is/image/HermanMillerStore/s_frame_carbon',
    alt: 'carbon',
  },
  {
    id: 'swatch-color-4',
    imgUrl:
      'https://s7d2.scene7.com/is/image/HermanMillerStore/s_frame_glacier',
    alt: 'glacier',
  },
  {
    id: 'swatch-color-5',
    imgUrl:
      'https://s7d2.scene7.com/is/image/HermanMillerStore/s_frame_nightfall',
    alt: 'nightfall',
  },
];

const FetchData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://api-ecommerce.mark2win.com/product')
      .then(res => res.json())
      .then(json => {
        setData(json.data);
      });
  }, []);
  return data;
};

export default FetchData;

export const fetchProductAPI = () => async dispatch => {
  try {
    let res = await axios.get('http://api-ecommerce.mark2win.com/product');
    let {
      data: { data },
    } = res;

    dispatch({
      type: FETCH_ALL_PRODUCT,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchProductId = id => {
  return {
    type: FETCH_PRO_ID,
    payload: id,
  };
};

export const fetchProfileCategories = profileArray => {
  return {
    type: FETCH_CATEGORIES_ARRAY,
    payload: profileArray,
  };
};

export const fetchProductItemQty = ItemQty => {
  return {
    type: FETCH_ITEM_QTY,
    payload: ItemQty,
  };
};

export const fetchProductTotalPrice = productTotalPrice => {
  return {
    type: FETCH_TOTAL_PRICE,
    payload: productTotalPrice,
  };
};

export const fetchCartItems = cartItems => {
  localStorage.setItem('cartArr', JSON.stringify(cartItems))
  return {
    type: ADD_TO_CART,
    payload: cartItems,
  };
};

export const fetchSelection = selection => {
  return {
    type: FETCH_SELECTION,
    payload: selection,
  };
};

export const fetchSelectionPrice = selectionPrice => {
  return {
    type: FETCH_SELECTION_PRICE,
    payload: selectionPrice,
  };
};

export const fetchSelectionChecked = selectionChecked => {
  return {
    type: FETCH_SELECTION_CHECKED,
    payload: selectionChecked,
  };
};

export const fetchToggleDisplay = gridDisplay => {
  return {
    type: FETCH_GRID_DISPLAY,
    payload: gridDisplay,
  };
};



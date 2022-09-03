import {
  FETCH_SELECTION,
  FETCH_SELECTION_PRICE,
  FETCH_SELECTION_CHECKED,
} from '../helper';

const selectionInitState = {
  selection: {},
  selectionPrice: [],
  selectionChecked: [],
};

export const selectionReducer = (state = selectionInitState, action) => {
  switch (action?.type) {
    case FETCH_SELECTION:
      return {
        ...state,
        selection: action?.payload,
      };
    case FETCH_SELECTION_PRICE:
      return {
        ...state,
        selectionPrice: action?.payload,
      };
    case FETCH_SELECTION_CHECKED:
      return {
        ...state,
        selectionChecked: action?.payload,
      };
    default:
      return state;
  }
};

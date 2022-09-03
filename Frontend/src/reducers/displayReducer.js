import { FETCH_GRID_DISPLAY } from '../helper';

const INITI_STATE = {
  gridDisplay: 4,
  isTrue: true,
};

export const displayReducer = (state = INITI_STATE, action) => {
  switch (action?.type) {
    case FETCH_GRID_DISPLAY:
      return {
        ...state,
        gridDisplay: action?.payload,
      };
    default:
      return state;
  }
};

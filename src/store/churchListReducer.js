const defaultState = [];

const ADD_CHURCHES = 'ADD_CHURCHES_lIST';
const CLEAR_CHURCHES = 'CLEAR_CHURCHES_LIST';

export const churchesListReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_CHURCHES:
      return [...state, ...action.payload];
    case CLEAR_CHURCHES:
      return [];
    default:
      return state;
  }
};

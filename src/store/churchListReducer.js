const defaultState = [];

const ADD_CHURCHES = 'ADD_CHURCHES_lIST';

export const churchesListReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_CHURCHES:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

const defaultState = 1;

const CHANGE_CITY = 'CHANGE_CITY';

export const cityReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_CITY:
      return action.payload;
    default:
      return state;
  }
};

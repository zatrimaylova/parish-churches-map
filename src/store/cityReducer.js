const defaultState = 0;

const CHANGE_CITY = 'CHANGE_CITY';

export const cityReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_CITY:
      return action.payload;
    default:
      return state;
  }
};

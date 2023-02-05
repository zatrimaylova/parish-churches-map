const defaultState = {
  city: null,
};

const CHANGE_CITY = 'CHANGE_CITY';

export const cityReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_CITY:
      return { ...state, city: action.payload };
    default:
      return state;
  }
};

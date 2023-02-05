import { createStore, combineReducers } from 'redux';

import { churchesListReducer } from './churchListReducer';
import { cityReducer } from './cityReducer';

const rootReducers = combineReducers({
  city: cityReducer,
  churchesList: churchesListReducer,
});

export const store = createStore(rootReducers);

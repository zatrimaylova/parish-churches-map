import { createStore, combineReducers } from 'redux';

import { churchesListReducer } from './churchListReducer';
import { cityReducer } from './cityReducer';

const rootReducers = combineReducers({
  city: cityReducer,
  churchesList: churchesListReducer,
});

const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && process.env.NODE_ENV === 'development';

export const store = createStore(rootReducers, devtoolMiddleware && ext());

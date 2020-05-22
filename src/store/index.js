import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import fetchMiddleware from './fetchMiddleware';
import reducer from './reducers';

const isProduction = process.env.NODE_ENV === 'production'

const middlewares = [
  thunkMiddleware,
  fetchMiddleware,
]

if (!isProduction) middlewares.push(logger)

export default () => (
  createStore(
    reducer,
    applyMiddleware(...middlewares)
  )
);

// src/redux/store/store.js

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
// import authMiddleware from '../middleware/authMiddleware';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  // applyMiddleware(sagaMiddleware, authMiddleware)
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;


import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';


import { combineReducers } from 'redux';
import weatherReducer from './reducers/weatherReducer';
import searchReducer from './reducers/searchReducer';

const rootReducer = combineReducers({
  data: weatherReducer,
  search: searchReducer
});


const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;

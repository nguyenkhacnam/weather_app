
import { all } from 'redux-saga/effects';
import dataSaga from './dataSaga';
import searchSaga from './searchSaga';

function* rootSaga() {
  yield all([
    dataSaga(),
    searchSaga(),
  ]);
}

export default rootSaga;

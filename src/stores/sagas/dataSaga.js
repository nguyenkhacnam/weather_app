
import { takeLatest, put, call } from 'redux-saga/effects';
import { fetchDataSuccess, fetchDataFailure } from '../actions';
import { getWeather } from '../../apis/weather';
import { FETCH_DATA } from '../type';

function* fetchDataSaga() {
  try {
    const data = yield call(getWeather); 
    yield put(fetchDataSuccess(data));
  } catch (error) {
    yield put(fetchDataFailure(error));
  }
}

function* dataSage() {
  yield takeLatest(FETCH_DATA, fetchDataSaga);
}

export default dataSage;

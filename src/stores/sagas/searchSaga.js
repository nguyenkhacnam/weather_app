import { takeLatest, put, call, all } from "redux-saga/effects";
import { searchDataSuccess, searchDataFailure } from "../actions";
import { getWeather, search } from "../../apis/weather";
import { SEARCH_DATA } from "../type";

function* searchDataSaga(action) {
  try {
    const [currentWeather, weatherList] = yield all([
      call(search, action.payload),
      call(getWeather, action.payload),
    ]); // Gọi hàm searchApi với tham số là query
    yield put(searchDataSuccess(currentWeather, weatherList));
  } catch (error) {
    yield put(searchDataFailure(error));
  }
}

function* searchSaga() {
  yield takeLatest(SEARCH_DATA, searchDataSaga);
}

export default searchSaga;

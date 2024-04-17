import {
  FETCH_DATA,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
  SEARCH_DATA,
  SEARCH_DATA_FAILURE,
  SEARCH_DATA_SUCCESS,
} from "./type";

export const fetchData = () => ({
  type: FETCH_DATA,
});

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

export const searchData = (query) => ({
  type: SEARCH_DATA,
  payload: query,
});

export const searchDataSuccess = (currentWeather, weatherList) => {
  return {
    type: SEARCH_DATA_SUCCESS,
    payload: { currentWeather, weatherList },
  };
};

export const searchDataFailure = (error) => ({
  type: SEARCH_DATA_FAILURE,
  payload: error,
});

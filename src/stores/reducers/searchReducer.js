
import { SEARCH_DATA, SEARCH_DATA_SUCCESS, SEARCH_DATA_FAILURE } from '../type';

const initialState = {
  results: [],
  loading: false,
  error: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_DATA:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SEARCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload,
      };
    case SEARCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;

import {
  MAIN_FETCH_COUNTERS,
} from './actions';

const initialState = {
  counters: [],
  initialFetch: false,
  error: false,
}

const reducer = (state = initialState, action) => {
const { type, payload } = action

switch (type) {
  case `${MAIN_FETCH_COUNTERS}_SUCCESS`: {
    return {
      ...state,
      counters: payload.body,
      initialFetch: true,
    };
  }
  case `${MAIN_FETCH_COUNTERS}_FAILURE`: {
    return {
      ...state,
      error: payload.error,
    };
  }
  default: return state
  }
}

export default reducer;


import {
  MAIN_FETCH_COUNTERS,
  MAIN_ADD_COUNTER,
  MAIN_FETCH_PLUS,
  MAIN_FETCH_MINUS,
} from './actions';

const initialState = {
  counters: [],
  initialFetch: false,
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
  case `${MAIN_FETCH_PLUS}_SUCCESS`: {
    const counters = state.counters.map(c => c.id === payload.body.id ? {...c, count: c.count + 1} : c)
    return {
      ...state,
      counters,
    };
  }
  case `${MAIN_FETCH_MINUS}_SUCCESS`: {
    const counters = state.counters.map(c => c.id === payload.body.id ? {...c, count: c.count - 1} : c)
    return {
      ...state,
      counters,
    };
  }
  case MAIN_ADD_COUNTER: {
    return {
      ...state,
      counters: [
        ...state.counters,
        payload.counter,
      ]
    };
  }
  default: return state
  }
}

export default reducer;


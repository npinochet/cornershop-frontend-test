import {
  MAIN_FETCH_COUNTERS,
  MAIN_ADD_COUNTER,
  MAIN_FETCH_MODIFY,
  MAIN_SELECT_COUNTER,
  MAIN_FETCH_REMOVE,
  MAIN_CLEAR_SELECT_COUNTER,
} from './actions';

const initialState = {
  counters: [],
  selected: [],
  selectMode: false,
  initialFetch: false,
  update: false,
}

const reducer = (state = initialState, action) => {
const { type, payload } = action

switch (type) {
  case `${MAIN_FETCH_COUNTERS}_SUCCESS`: {
    return {
      ...state,
      update: false,
      counters: payload.body,
      initialFetch: true,
    };
  }
  case `${MAIN_FETCH_MODIFY}_INITIAL`: {
    const { id } = payload.params.body
    const amount = payload.params.amount
    const counters = state.counters.map(c => c.id === id ? {...c, count: c.count + amount} : c)
    return {
      ...state,
      counters,
    };
  }
  case `${MAIN_FETCH_MODIFY}_FAILURE` : {
    const { id } = payload.params.body
    const amount = payload.params.amount
    const counters = state.counters.map(c => c.id === id ? {...c, count: c.count - amount} : c)
    return {
      ...state,
      counters,
    };
  }
  case `${MAIN_FETCH_REMOVE}_SUCCESS`: {
    const selected = state.selected.filter(cid => cid !== payload.body)
    return {
      ...state,
      counters: state.counters.filter(c => c.id !== payload.body),
      selected,
      selectMode: selected.length > 0,
    }
  }
  case MAIN_ADD_COUNTER: {
    return {
      ...state,
      update: true,
      counters: [
        ...state.counters,
        payload.counter,
      ]
    };
  }
  case MAIN_SELECT_COUNTER: {
    const { id, unselect } = payload
    const selected = unselect ? state.selected.filter(cid => cid !== id) : [...state.selected, id]
    return {
      ...state,
      selected,
      selectMode: selected.length > 0,
    };
  }
  case MAIN_CLEAR_SELECT_COUNTER:
    return {
      ...state,
      selected: initialState.selected,
      selectMode: false,
    }
  default: return state
  }
}

export default reducer;


import {
  SEARCHBAR_SET,
  SEARCHBAR_SEARCH,
  SEARCHBAR_FOCUS,
} from './actions';

const initialState = {
  show: false,
  search: '',
  focused: false,
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SEARCHBAR_SET: {
      return {
        ...state,
        show: payload.show,
      };
    }
    case SEARCHBAR_SEARCH: {
      return {
        ...state,
        search: payload.search ? payload.search : initialState.search,
      }
    }
    case SEARCHBAR_FOCUS: {
      return {
        ...state,
        focused: payload.focus,
      }
    }
    default: return state
  }
}

export default reducer;
import {
  SEARCHBAR_SET,
} from './actions';

const initialState = {
  show: false,
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
    default: return state
  }
}

export default reducer;
import {
  ADDBAR_SET,
} from './actions';

const initialState = {
  show: false,
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case ADDBAR_SET: {
      return {
        ...state,
        show: payload.show,
      };
    }
    default: return state
  }
}

export default reducer;
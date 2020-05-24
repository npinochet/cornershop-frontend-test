import {
  ALERTMODAL_SET,
} from './actions';

const initialState = {
  show: false,
  title: false,
  message: false,
  content: [], // [{text: 'retry', props: {white: true}, 'action': {type: ACTION_TO_DISCPATCH, ...}}, ...]
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case ALERTMODAL_SET: {
      const show = payload.show
      return {
        ...state,
        show: show,
        title: payload.title || state.title,
        message: payload.message || state.message,
        content: payload.content || state.content,
      };
    }
    default: return state
  }
}

export default reducer;
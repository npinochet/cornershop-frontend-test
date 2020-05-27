import { combineReducers } from 'redux';

import main from '../routes/Main/reducer';
import searchBar from '../components/SearchBar/reducer';
import optionBar from '../components/OptionBar/reducer';
import addModal from '../components/AddModal/reducer';
import alertModal from '../components/AlertModal/reducer';

const initialState = {
  isFetching: false,
  requestCounter: 0,
}

const app = (state = initialState, action) => {
  const { type } = action
  if (type.includes('FETCH')) {
    let requestCounter = state.requestCounter
    if (type.includes('_REQUEST')) {
      requestCounter = state.requestCounter + 1
    } else if (type.includes('_SUCCESS') || type.includes('_FAILURE')) {
      requestCounter = state.requestCounter - 1
    }
    return {
      ...state,
      requestCounter,
      isFetching: requestCounter > 0,
    }
  }
  return state
}
  
export default combineReducers({
  app,
  main,
  searchBar,
  optionBar,
  addModal,
  alertModal,
});

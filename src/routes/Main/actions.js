export const MAIN_FETCH_COUNTERS = 'MAIN_FETCH_COUNTERS';
export const MAIN_ADD_COUNTER = 'MAIN_ADD_COUNTER';
export const MAIN_FETCH_MODIFY = 'MAIN_FETCH_MODIFY';
export const MAIN_SELECT_COUNTER = 'MAIN_SELECT_COUNTER';
export const MAIN_CLEAR_SELECT_COUNTER = 'MAIN_CLEAR_SELECT_COUNTER';
export const MAIN_FETCH_REMOVE = 'MAIN_FETCH_REMOVE';

export const fetchCounters = debouncer => ({
  type: MAIN_FETCH_COUNTERS,
  fetch: true,
  debouncer,
  url: '/api/v1/counter',
  params: { method: 'GET' },
});

export const addCounter = counter => ({
  type: MAIN_ADD_COUNTER,
  payload: { counter },
})

export const fetchCounterModify = (counter_id, amount) => ({
  type: MAIN_FETCH_MODIFY,
  fetch: true,
  debouncer: true,
  url: '/api/v1/counter/' + (amount < 0 ? 'dec' : 'inc'),
  params: {
    method: 'POST',
    body: { id: counter_id },
    amount,
  },
});

export const fetchCounterRemoveSelected = () => (dispatch, getState) => {
  const { selected } = getState().main
  const delAction = id => ({
    type: MAIN_FETCH_REMOVE,
    fetch: true,
    url: '/api/v1/counter',
    params: {
      method: 'DELETE',
      body: { id },
    },
  })

  return Promise.resolve(selected.map(cid => dispatch(delAction(cid)))[0])
};

export const selectCounter = (counter_id, unselect) => ({
  type: MAIN_SELECT_COUNTER,
  payload: { id: counter_id, unselect },
});

export const clearSelectCounter = () => ({
  type: MAIN_SELECT_COUNTER,
})
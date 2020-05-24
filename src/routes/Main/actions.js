export const MAIN_FETCH_COUNTERS = 'MAIN_FETCH_COUNTERS';
export const MAIN_ADD_COUNTER = 'MAIN_ADD_COUNTER';
export const MAIN_FETCH_PLUS = 'MAIN_FETCH_PLUS';
export const MAIN_FETCH_MINUS = 'MAIN_FETCH_MINUS';

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

export const fetchCounterPlus = counter_id => ({
  type: MAIN_FETCH_PLUS,
  fetch: true,
  debouncer: true,
  url: '/api/v1/counter/inc',
  params: {
    method: 'POST',
    body: { id: counter_id },
  },
});

export const fetchCounterMinus = counter_id => ({
  type: MAIN_FETCH_MINUS,
  fetch: true,
  debouncer: true,
  url: '/api/v1/counter/dec',
  params: {
    method: 'POST',
    body: { id: counter_id },
  },
});
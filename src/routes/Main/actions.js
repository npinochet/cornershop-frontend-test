export const MAIN_FETCH_COUNTERS = 'MAIN_FETCH_COUNTERS';
export const MAIN_ADD_COUNTER = 'MAIN_ADD_COUNTER';

export const fetchCounters = () => ({
  type: MAIN_FETCH_COUNTERS,
  fetch: true,
  url: '/api/v1/counter',
  params: { method: 'GET' },
});

export const addCounter = counter => ({
  type: MAIN_ADD_COUNTER,
  payload: { counter },
})

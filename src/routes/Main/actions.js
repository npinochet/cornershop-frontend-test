export const MAIN_FETCH_COUNTERS = 'MAIN_FETCH_COUNTERS';

export const fetchCounters = () => ({
  type: MAIN_FETCH_COUNTERS,
  fetch: true,
  url: '/api/v1/counter',
  params: { method: 'GET' },
});

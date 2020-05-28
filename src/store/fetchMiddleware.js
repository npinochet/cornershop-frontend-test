const isProduction = process.env.NODE_ENV === 'production'
const baseUrl = isProduction ? process.env.REACT_APP_API_URL : 'http://localhost:3001'

const fetchWithTimeout = (url, options, timeout = 7000) => (
  Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), timeout)
    )
  ])
)

const fetchMiddleware = store => next => async action => {
  if (!action || !action.fetch) return next(action)

  const { dispatch } = store
  const { type, url, params, debouncer } = action

  const headers = Object.assign(params.headers || {}, {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  })

  const config = Object.assign({}, {
    method: params.method,
    headers,
    body: JSON.stringify(params.body),
  })

  const initial_action = { type: `${type}_INITIAL`, payload: { url, params } };
  dispatch(initial_action)

  // Debouncer for isFetching
  const request_action = { type: `${type}_REQUEST`, payload: { url, params } };
  let debounceTimer = false
  if (!debouncer) dispatch(request_action); else {
    debounceTimer = setTimeout(() => dispatch(request_action), 300)
  }

  let response
  try {
    response = await fetchWithTimeout(baseUrl + url, config, 7000)
    clearTimeout(debounceTimer)
  } catch (err) {
    clearTimeout(debounceTimer)
    const payload = { ok: false, error: err, params }
    dispatch({ type: `${type}_FAILURE`, payload })
    return payload
  }
  
  try {
    const payload = {
      ok: response.ok,
      status: response.status,
      body: await response.json(),
      headers: response.headers,
    };
    const responseType = response.ok ? `${type}_SUCCESS` : `${type}_FAILURE`
    dispatch({ type: responseType, payload });
    return payload
  } catch (err) {
    const payload = {
      ok: response.ok,
      status: response.status,
      body: null,
      params,
      error: err,
    };
    dispatch({ type: `${type}_FAILURE`, payload })
    return payload
  }
}

export default fetchMiddleware;

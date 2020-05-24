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
  if (!action.fetch) return next(action)

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

  let response

  // Debouncer for isFetching
  const request_action = { type: `${type}_REQUEST`, url, params };
  if (!debouncer) dispatch(request_action); else {
    setTimeout(() => {
      if (!response) dispatch();
    }, 500)
  }
 
  try {
    response = await fetchWithTimeout(baseUrl + url, config, 7000)
  } catch (err) {
    const payload = { ok: false, error: err }
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
      error: err,
    };
    dispatch({ type: `${type}_FAILURE`, payload })
    return payload
  }
}

export default fetchMiddleware;

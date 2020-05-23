export const ADDMODAL_SET = 'ADDMODAL_SET';
export const ADDMODAL_FETCH_ADD = 'ADDMODA_FETCH_ADD';

export const setAddModal = show => ({
  type: ADDMODAL_SET,
  payload: { show },
});

export const fetchAddCounter = title => ({
  type: ADDMODAL_FETCH_ADD,
  fetch: true,
  url: '/api/v1/counter',
  params: {
    method: 'POST',
    body: { title },
  },
});
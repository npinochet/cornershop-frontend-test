export const SEARCHBAR_SET = 'SEARCHBAR_SET';
export const SEARCHBAR_SEARCH = 'SEARCHBAR_SEARCH';
export const SEARCHBAR_FOCUS = 'SEARCHBAR_FOCUS';

export const setSearchBar = show => ({
  type: SEARCHBAR_SET,
  payload: { show },
});

export const setSearch = value => ({
  type: SEARCHBAR_SEARCH,
  payload: { search: value },
});

export const setFocus = focus => ({
  type: SEARCHBAR_FOCUS,
  payload: { focus },
});
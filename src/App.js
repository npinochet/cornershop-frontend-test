import React, { Fragment } from 'react';
import Content from './routes';

import SearchBar from './components/SearchBar';
import AddBar from './components/AddBar';

const App = () => (
  <Fragment>
    <SearchBar />
    <Content />
    <AddBar />
  </Fragment>
);

export default (App);
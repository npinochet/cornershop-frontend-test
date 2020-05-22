import React, { Fragment } from 'react';
import Content from './routes';

import SearchBar from './components/SearchBar';
import AddBar from './components/AddBar';
import AddModal from './components/AddModal';

const App = () => (
  <Fragment>
    <AddModal />
    <SearchBar />
    <Content />
    <AddBar />
  </Fragment>
);

export default (App);
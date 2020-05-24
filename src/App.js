import React, { Fragment } from 'react';
import Content from './routes';

import SearchBar from './components/SearchBar';
import AddBar from './components/AddBar';
import AddModal from './components/AddModal';
import AlertModal from './components/AlertModal';

const App = () => (
  <Fragment>
    <AddModal />
    <AlertModal />
    <SearchBar />
    <Content />
    <AddBar />
  </Fragment>
);

export default (App);
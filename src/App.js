import React, { Fragment } from 'react';
import Content from './routes';

import SearchBar from './components/SearchBar';
import OptionBar from './components/OptionBar';
import AddModal from './components/AddModal';
import AlertModal from './components/AlertModal';

const App = () => (
  <Fragment>
    <AddModal />
    <AlertModal />
    <SearchBar />
    <Content />
    <OptionBar />
  </Fragment>
);

export default (App);
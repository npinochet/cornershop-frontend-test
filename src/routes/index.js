import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';

import Welcome from './Welcome';
import Main from './Main';

export default () => (
  <Switch>
    <Route exact path="/" component={Welcome} />
    <Route exact path="/main" component={Main} />
  </Switch>
);

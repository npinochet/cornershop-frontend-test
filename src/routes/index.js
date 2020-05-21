import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
import Loading from '../components/Loading';

const Welcome = React.lazy(() => import('./Welcome'))

const NotFound = React.lazy(() => import('./NotFound'))

export default () => (
  <Suspense fallback={<Loading />}>
    <Switch>
      <Route path="/" component={Welcome} />
      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

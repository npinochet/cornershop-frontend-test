import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import store from './store';
import './style.css';

// fix viewport on mobile, disable scroll with address bar
const update_mobile_height = function() {
  document.documentElement.style.setProperty('--mobile-height', `${window.innerHeight}px`);
}
update_mobile_height()
window.addEventListener('resize', update_mobile_height);

ReactDOM.render(
  <Provider store={store()}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
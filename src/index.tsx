import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { App } from './components/App';
import rootStore from './store';

import './index.scss';

ReactDOM.render(
  <HashRouter>
    <Provider store={rootStore}>
      <StrictMode>
        <App />
      </StrictMode>
    </Provider>
  </HashRouter>,
  document.getElementById('root'),
);

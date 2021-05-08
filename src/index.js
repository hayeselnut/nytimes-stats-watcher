import React from 'react';
import ReactDOM from 'react-dom';

import AppHeader from './AppHeader';
import App from './App';
import AppFooter from './AppFooter';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './nyt.css';

ReactDOM.render(
  <React.StrictMode>
    <header>
      <AppHeader />
    </header>
    <main>
      <BrowserRouter>
        <Switch>
          <Route path='/' component={App} />
        </Switch>
      </BrowserRouter>
    </main>
    <footer>
      <AppFooter />
    </footer>
  </React.StrictMode>,
  document.getElementById('root'),
);

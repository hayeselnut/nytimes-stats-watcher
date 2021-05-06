import React from 'react';
import ReactDOM from 'react-dom';

import AppHeader from './AppHeader';
import App from './App';
import AppFooter from './AppFooter';


import 'semantic-ui-css/semantic.min.css';
import './nyt.css';

ReactDOM.render(
  <React.StrictMode>
    <header>
      <AppHeader />
    </header>
    <main>
      <App />
    </main>
    <footer>
      <AppFooter />
    </footer>
  </React.StrictMode>,
  document.getElementById('root'),
);

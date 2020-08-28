import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

if ( document.getElementById('c19t-all-stats-container') ) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('c19t-all-stats-container')
  );
}

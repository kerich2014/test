import React from 'react';
import ReactDOM from 'react-dom';
import './app/styles/global.css';
import { App } from './app/App';

const ignoreResizeObserverErrors = () => {
  const originalError = console.error;
  
  console.error = (...args) => {
    if (typeof args[0] === 'string' && 
        args[0].includes('ResizeObserver loop completed with undelivered notifications')) {
      return;
    }
    originalError.apply(console, args);
  };
};

ignoreResizeObserverErrors();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
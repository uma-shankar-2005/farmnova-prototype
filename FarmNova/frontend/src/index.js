import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';

// Suppress ResizeObserver loop error in development
const ignoreResizeObserverError = () => {
  const resizeObserverErrRe = /^ResizeObserver loop (limit|completed) exceeded/;
  window.addEventListener('error', (e) => {
    if (resizeObserverErrRe.test(e.message)) {
      e.stopImmediatePropagation();
    }
  });
};
ignoreResizeObserverError();

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
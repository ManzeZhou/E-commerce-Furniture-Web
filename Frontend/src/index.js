import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { legacy_createStore as createStore } from 'redux';
import rootReducer from './reducers';
import logger from 'redux-logger';



const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares, thunk));

// create store and overwrite any values that we already have saved
const store = createStore(rootReducer, undefined, composedEnhancers);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

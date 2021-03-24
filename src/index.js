import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import {Provider} from 'react-redux'
import store from './store/index.js'


ReactDOM.render((


<Provider store={store}>
  <BrowserRouter >
    <App/>
  </BrowserRouter>
</Provider>
), document.getElementById('root'));

serviceWorker.unregister();

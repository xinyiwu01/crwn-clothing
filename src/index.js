import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import { store } from './store/store'

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <Provider store={store}> 
      <BrowserRouter>
          <App />   {/**any component inside of provider can access context */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  rootElement
);



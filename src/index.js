import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import { store } from './store/store'
import { stripePromise } from './utils/stripe/stripe.utils';

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <Provider store={store}> 
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <App />   {/**any component inside of provider can access context */}
        </Elements>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  rootElement
);



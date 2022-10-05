import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { UserProvider } from './contexts/user.context';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import { ProductsProvider } from './contexts/products.context';
import { CartProvider } from './contexts/cart.context';

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider> {/** users in diff locations have diff products */}
          <CartProvider>
            <App />   {/**any component inside of provider can access context */}
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);



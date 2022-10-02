import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { UserProvider } from './components/contexts/user.context';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />   {/**any component inside of provider can access context */}
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);



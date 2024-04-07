import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import Setting from './consts/consts';
import { offers } from './mocks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offersNumber={Setting.offersNumber} offers = {offers}/>
  </React.StrictMode>
);

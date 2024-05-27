import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
//import Setting from './consts/consts';
//import { offers } from './mocks/offers';
import {reviews} from './mocks/reviews';
import {Provider} from 'react-redux';
import {store} from './store';
import ErrorMessage from './components/error-message/error-message';
import {checkAuthAction, fetchOffersAction} from './store/api-actions.ts';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* <App offersNumber={Setting.offersNumber} offers = {offers} reviews={reviews}/> */}
    <Provider store={store}>
      <ErrorMessage />
      <App
        reviews={reviews}
      />
    </Provider>
  </React.StrictMode>
);

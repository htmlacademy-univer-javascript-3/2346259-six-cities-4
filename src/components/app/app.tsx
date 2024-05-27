import Favorites from '../../pages/favorites-page/favorites-page';
import Login from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import OfferPage from '../../pages/offer-page/offer-page';
import Error404 from '../../pages/error-404/error-404';
import PrivateRoute from '../private-route/private-route';
import { AuthorizationStatus } from '../../consts/autorization-status';
import { Offer } from '../../types/offer.ts';
import { Review } from '../../types/review.ts';
import {useAppDispatch, useAppSelector} from '../../hooks/index.ts';
import {listFilling} from '../../store/action.ts';

type AppProps = {
  reviews: Review[];
};

function App({reviews}: AppProps): JSX.Element {
  const offers: Offer[] = useAppSelector((state) => state.offers);
  const dispatch = useAppDispatch();
  dispatch(listFilling());
  const favorites = offers.filter((o) => o.isFavorite);
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element = {<MainPage favorites={favorites}/>}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='favorites' element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <Favorites favorites={favorites}/>
            </PrivateRoute>
          }
          >
          </Route>
          <Route path='offer/:id' element={<OfferPage reviews={reviews} favorites={favorites}/>}></Route>
        </Route>
        <Route path='*' element={<Error404 />}></Route>
      </Routes>
    </BrowserRouter>
    //<MainPage offersNumber={offersNumber}/>
  );
}

export default App;

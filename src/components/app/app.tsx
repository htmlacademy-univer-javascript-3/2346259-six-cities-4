import Favorites from '../../pages/favorites-page/favorites-page';
import Login from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import {Route, Routes} from 'react-router-dom';
import OfferPage from '../../pages/offer-page/offer-page';
import Error404 from '../../pages/error-404/error-404';
import PrivateRoute from '../private-route/private-route';
import { AuthorizationStatus } from '../../consts/autorization-status';
import { Offer } from '../../types/offer.ts';
import { Review } from '../../types/review.ts';
import {useAppSelector} from '../../hooks/index.ts';
import LoadingScreen from '../../pages/loading-screen/loading.screen.tsx';
import browserHistory from '../../browser-history.tsx';
import HistoryRouter from '../history-router/history-router.tsx';

type AppProps = {
  reviews: Review[];
};

function App({reviews}: AppProps): JSX.Element {
  const offers: Offer[] = useAppSelector((state) => state.offers);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingScreen/>
    );
  }
  const favorites = offers.filter((o) => o.isFavorite);
  return(
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path='/'>
          <Route index element = {<MainPage favorites={favorites}/>}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='favorites' element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <Favorites favorites={favorites}/>
            </PrivateRoute>
          }
          >
          </Route>
          <Route path='offer/:id' element={<OfferPage reviews={reviews} favorites={favorites}/>}></Route>
        </Route>
        <Route path='*' element={<Error404 />}></Route>
      </Routes>
    </HistoryRouter>
    //<MainPage offersNumber={offersNumber}/>
  );
}

export default App;

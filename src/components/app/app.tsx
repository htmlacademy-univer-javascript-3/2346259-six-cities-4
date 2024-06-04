import {Route, Routes} from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page.tsx';
import LoginScreen from '../../pages/login-page/login-page.tsx';
import FavoritesPage from '../../pages/favorites-page/favorites-page.tsx';
import Error404 from '../../pages/error-404/error-404.tsx';
import OfferPage from '../../pages/offer-page/offer-page.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import {Offer} from '../../types/offer.ts';
import {useAppSelector} from '../../hooks/index.ts';
import LoadingScreen from '../../pages/loading-screen/loading.screen.tsx';
import browserHistory from '../../browser-history.tsx';
import HistoryRouter from '../history-router/history-router.tsx';
import {
  getIsOffersDataLoading,
  getOffers,
} from '../../store/offers-process/selectors.ts';
import {getAuthorizationStatus} from '../../store/user-process/selectors.ts';
import {AppRoute} from '../../consts/consts.tsx';
import { AuthorizationStatus } from '../../consts/autorization-status.tsx';


function App(): JSX.Element {
  const offers: Offer[] = useAppSelector(getOffers);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersDataLoading = useAppSelector(getIsOffersDataLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingScreen/>
    );
  }

  const favorites = offers.filter((o) => o.isFavorite);
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage favorites={favorites}/>}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <FavoritesPage favorites={favorites}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferPage favorites={favorites}/>}
        />
        <Route
          path="*"
          element={<Error404/>}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;

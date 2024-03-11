import Favorites from '../../pages/favorites-page/favorites-page';
import Login from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Offer from '../../pages/offer-page/offer-page';
import Error404 from '../../pages/error-404/error-404';
import PrivateRoute from '../private-route/private-route';
import { AuthorizationStatus } from '../../consts/autorization-status';


type AppProps = {
  offersNumber: number;
};

function App({offersNumber}: AppProps){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element = {<MainPage offersNumber={offersNumber}/>}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='favorites' element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <Favorites />
            </PrivateRoute>
          }
          >
          </Route>
          <Route path='offer/:id' element={<Offer />}></Route>
        </Route>
        <Route path='*' element={<Error404 />}></Route>
      </Routes>
    </BrowserRouter>
    //<MainPage offersNumber={offersNumber}/>
  );
}

export default App;

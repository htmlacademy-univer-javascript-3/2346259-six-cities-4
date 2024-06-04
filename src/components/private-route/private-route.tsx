import {Navigate} from 'react-router-dom';
import {AppRoute} from '../../consts/consts.tsx';
import { AuthorizationStatus } from '../../consts/autorization-status.tsx';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRoute;

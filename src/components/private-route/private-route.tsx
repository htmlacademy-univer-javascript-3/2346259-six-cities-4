import {Navigate} from 'react-router-dom';
import {AuthorizationStatus} from '../../consts/autorization-status';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={'/login'} />
  );
}

export default PrivateRoute;

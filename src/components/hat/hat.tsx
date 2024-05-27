import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer.ts';
import {useAppDispatch, useAppSelector} from '../../hooks/index.ts';
import {AuthorizationStatus} from '../../consts/autorization-status.tsx';
import { logoutAction } from '../../store/api-actions.ts';


type HatProps = {
  favorites: Offer[];
}

function Hat({favorites}: HatProps): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authorizationStatus);
  const userEmail = useAppSelector((state) => state.userEmail);
  const handleSignOut = () => {
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to="/" className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <div className="header__nav-link header__nav-link--profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  {user === AuthorizationStatus.Auth ? (
                    <Link to="/favorites">
                      <span className="header__user-name user__name">{userEmail}</span>
                      <span className="header__favorite-count">{favorites.length}</span>
                    </Link>
                  ) : (
                    <Link to="/login" className="header__nav-link">Login</Link>
                  )}
                </div>
              </li>
              {user === AuthorizationStatus.Auth && (
                <li className="header__nav-item">
                  <a href="#" className="header__nav-link" onClick={handleSignOut}>
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Hat;

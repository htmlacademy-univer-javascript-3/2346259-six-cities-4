import {FormEvent, useRef} from 'react';
import {useAppDispatch} from '../../hooks';
import {Link} from 'react-router-dom';
import {loginAction} from '../../store/api-actions';
import {cityChange} from '../../store/other-process/other-process.ts';
import {citiesForRandomString} from '../../consts/consts.tsx';

const LOGO_WIDTH = '81';
const LOGO_HEIGHT = '41';

function LoginScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(
        loginAction({
          email: loginRef.current.value,
          password: passwordRef.current.value,
        })
      );
    }
  };

  const getRandomCity = () => citiesForRandomString[Math.floor(Math.random() * citiesForRandomString.length)];

  const newCityName = getRandomCity();
  const handleCityClick = () => {
    dispatch(cityChange(newCityName));
  };
  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="#">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={LOGO_WIDTH}
                  height={LOGO_HEIGHT}
                />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email" name="email"
                  placeholder="Email"
                  ref={loginRef}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  ref={passwordRef}
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to="/" className="locations__item-link" onClick={handleCityClick}>
                <span>{newCityName}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;

//import OfferCard from '../../components/offer-card/offer-card';
import OfferCards from '../../components/offer-cards/offer-cards';
import { Offer } from '../../types/offer';
import Map from '../../components/map/map.tsx';
import {useAppSelector} from '../../hooks/index.ts';
import {useEffect, useState} from 'react';
import CitiesList from '../../components/list-of-cities/list-of-cities.tsx';
import {Cities} from '../../consts/consts.tsx';
import CityCardsSorting from '../../components/city-cards-sorting/city-cards-sorting.tsx';

type MainPageProps = {
  favorites: Offer[];
}


function MainPage({favorites}: MainPageProps): JSX.Element {
  const offers = useAppSelector((state) => state.offers);

  const [curCityOffers, setCurCityOffers] = useState<Offer[]>(offers);


  const city = useAppSelector((state) => state.city);
  useEffect(() => {
    const filteredOffers = offers.filter((offer) => offer.city.name === city);
    setCurCityOffers(filteredOffers);
  }, [city, offers]);
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <div className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">{favorites.length}</span>
                  </div>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={Cities}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">`${curCityOffers.length} places to stay in ${city}`</b>
              <CityCardsSorting/>
              <div className="cities__places-list places__list tabs__content">
                <OfferCards cities={curCityOffers} listType={'typical'}/>
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={curCityOffers.length > 0 ? curCityOffers[0].city : offers[0].city} points={curCityOffers}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;

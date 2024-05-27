//import OfferCard from '../../components/offer-card/offer-card';
import OfferCards from '../../components/offer-cards/offer-cards';
import { Offer } from '../../types/offer';
import Map from '../../components/map/map.tsx';
import {useAppSelector} from '../../hooks/index.ts';
import {useEffect, useState} from 'react';
import CitiesList from '../../components/list-of-cities/list-of-cities.tsx';
import {Cities} from '../../consts/consts.tsx';
import CityCardsSorting from '../../components/city-cards-sorting/city-cards-sorting.tsx';
import Hat from '../../components/hat/hat.tsx';

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
      <Hat favorites={favorites}/>

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
                <Map city={curCityOffers.length > 0 ? curCityOffers[0].city : offers[0].city} points={curCityOffers}
                  specialCaseId={undefined}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;

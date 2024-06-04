import {Offer} from '../../types/offer.ts';
import Map from '../../components/map/map.tsx';
import {useAppSelector} from '../../hooks/index.ts';
import {useMemo} from 'react';
import CitiesList from '../../components/list-of-cities/list-of-cities.tsx';
import {Cities} from '../../consts/consts.tsx';
import Hat from '../../components/hat/hat.tsx';
import {getOffers} from '../../store/offers-process/selectors.ts';
import ListOffers from '../../components/list-of-offers/list-of-offers.tsx';
import EmptyOffers from '../../components/empty-offers/empty-offers.tsx';


type MainPageProps = {
  favorites: Offer[];
  city: string;
}

function MainPage({favorites, city}: MainPageProps): JSX.Element {
  const offers = useAppSelector(getOffers);

  const curCityOffers = useMemo(
    () => offers.filter((offer) => offer.city.name === city),
    [offers, city]
  );

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
            {curCityOffers.length > 0 ? (
              <ListOffers city={city} offers={curCityOffers}/>
            ) : (
              <EmptyOffers city={city}/>
            )}
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

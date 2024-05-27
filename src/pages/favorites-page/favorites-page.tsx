import Hat from '../../components/hat/hat.tsx';
import { Link } from 'react-router-dom';
import OfferCard from '../../components/offer-card/offer-card';
import {Offer} from '../../types/offer';

type FavoritesScreenProps = {
  favorites: Offer[];
};

const LOGO_WIDTH = '64';
const LOGO_HEIGHT = '33';

function Favorites({favorites}: FavoritesScreenProps): JSX.Element {
  const favoritesMap = favorites.reduce(
    (acc: Record<string, Offer[]>, place: Offer) => {
      const city = place.city.name;
      acc[city] = [...(acc[city] ?? []), place];
      return acc;
    },
    {}
  );

  return(
    <div className="page">
      <Hat favorites={favorites}/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">

              {Object.keys(favoritesMap).map((city) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {favoritesMap[city].map((place) => (
                      <OfferCard key={place.id} offerCardInfo={place} offerCardType={'typical'}/>
                    ))}
                  </div>
                </li>
              ))}

            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link to="/" className="footer__logo-link">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={LOGO_WIDTH} height={LOGO_HEIGHT} />
        </Link>
      </footer>
    </div>
  );
}

export default Favorites;

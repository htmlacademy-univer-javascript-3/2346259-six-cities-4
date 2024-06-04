import {Offer} from '../../types/offer';
import Hat from '../../components/hat/hat.tsx';
import {Link} from 'react-router-dom';
import ListFavorites from '../../components/list-of-favorites/list-of-favorites.tsx';
import EmptyFavorites from '../../components/empty-favorites/empty-favorites.tsx';

type FavoritesPageProps = {
  favorites: Offer[];
};

const LOGO_WIDTH = '64';
const LOGO_HEIGHT = '33';

function FavoritesPage({favorites}: FavoritesPageProps): JSX.Element {
  return (
    <div className="page">
      <Hat favorites={favorites}/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favorites.length > 0 ? (
            <ListFavorites favorites={favorites}/>
          ) : (
            <EmptyFavorites/>
          )}
        </div>
      </main>
      <footer className="footer container">
        <Link to="/" className="footer__logo-link">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
          />
        </Link>
      </footer>
      ;
    </div>
  );
}

export default FavoritesPage;

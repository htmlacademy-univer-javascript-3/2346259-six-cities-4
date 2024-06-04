import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer';
import {getRating} from '../../utils.ts';
import {useAppDispatch} from '../../hooks/index.ts';
import {highlightMarker} from '../../store/offers-process/offer-process.ts';
import AddToFavoritesButton from '../add-to-favorites-button/add-to-favorites-button.tsx';


type OfferCardProps = {
  offerCardInfo: Offer;
  offerCardType: 'typical' | 'near';
};

const CITY_CARD_WIDTH = '260';
const CITY_CARD_HEIGHT = '200';

const BOOKMARK_ICON_WIDTH = 18;
const BOOKMARK_ICON_HEIGHT = 19;

function OfferCard({offerCardInfo, offerCardType}: OfferCardProps): JSX.Element {
  const {
    id,
    title,
    type,
    price,
    isFavorite,
    isPremium,
    rating,
    previewImage,
  } = offerCardInfo;
  const dispatch = useAppDispatch();
  return (
    <div onMouseOver={() => dispatch(highlightMarker({id}))}
      onMouseLeave={() => dispatch(highlightMarker(null))}
    >
      <article
        className={`${offerCardType === 'typical' ? 'cities__card place-card' : 'near-places__card place-card'}`}
      >
        {isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <img className="place-card__image" src={previewImage} width={CITY_CARD_WIDTH} height={CITY_CARD_HEIGHT}
            alt="Place image"
          />
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <AddToFavoritesButton
              id={id}
              isFavorite={isFavorite}
              iconWidth={BOOKMARK_ICON_WIDTH}
              iconHeight={BOOKMARK_ICON_HEIGHT}
              buttonClass="place-card__bookmark-button"
              activeClass="place-card__bookmark-button--active"
              iconClass="place-card__bookmark-icon"
              buttonText="In bookmarks"
            />
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: getRating(rating)}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <Link to={`/offer/${id}`} state={offerCardInfo} onClick={() => window.scrollTo(0, 0)}>
              {title}
            </Link>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    </div>
  );
}

export default OfferCard;

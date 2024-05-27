import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer';
import {getRating} from '../../utils.ts';
import {useAppDispatch} from '../../hooks/index.ts';
import {highlightMarker} from '../../store/action.ts';

type OfferCardProps = {
  offerCardInfo: Offer;
  offerCardType: 'typical' | 'near';
};

const CITY_CARD_WIDTH = '260';
const CITY_CARD_HEIGHT = '200';

const BOOKMARK_ICON_WIDTH = '18';
const BOOKMARK_ICON_HEIGHT = '19';

function OfferCard({offerCardInfo, offerCardType}: OfferCardProps): JSX.Element {
  const {
    id,
    title,
    type,
    price,
    //city,
    //location,
    isFavorite,
    isPremium,
    rating,
    previewImage,
  } = offerCardInfo;

  const dispatch = useAppDispatch();

  return (
    <Link to={`/offer/${id}`} state={offerCardInfo}>
      <article className={`${offerCardType === 'typical' ? 'cities__card place-card' : 'near-places__card place-card'}`}
        onMouseOver={() => dispatch(highlightMarker({id}))}
        onMouseLeave={() => dispatch(highlightMarker(null))}
        onClick={() => window.scrollTo(0, 0)}
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
            <button
              className="place-card__bookmark-button place-card__bookmark-button--active button"
              type="button"
            >
              <svg className="place-card__bookmark-icon" width={BOOKMARK_ICON_WIDTH} height={BOOKMARK_ICON_HEIGHT}>
                {isFavorite && <use xlinkHref="#icon-bookmark"></use>}
              </svg>
              <span className="visually-hidden">In bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: getRating(rating)}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            {title}
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    </Link>
  );
}

export default OfferCard;
import {useAppSelector} from '../../hooks';
import {Offer} from '../../types/offer';
import OfferCard from '../offer-card/offer-card.tsx';
import {getSorting} from '../../utils.ts';
import {memo} from 'react';
import {getSortType} from '../../store/other-process/selectors.ts';

type OfferCardsProps = {
  cities: Offer[];
  listType: 'typical' | 'near';
};

function OfferCards({cities, listType}: OfferCardsProps) {
  const selectedSortType = useAppSelector(getSortType);

  return (
    <div
      className={`${listType === 'typical' ? 'cities__places-list places__list tabs__content' : 'near-places__list places__list'}`}
    >
      {getSorting(cities, selectedSortType).map((city) => (
        <OfferCard key={city.id} offerCardInfo={city} offerCardType={listType}/>
      ))}
    </div>
  );
}

const OfferCardsMemo = memo(OfferCards);

export default OfferCardsMemo;

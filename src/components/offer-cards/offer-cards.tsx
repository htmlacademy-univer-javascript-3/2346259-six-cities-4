import {Offer} from '../../types/offer';
import OfferCard from '../offer-card/offer-card';
import {useAppSelector} from '../../hooks';
import {getSorting} from '../../utils.ts';

type ListOfCityCardsProps = {
  cities: Offer[];
  listType: 'typical' | 'near';
};

function OfferCards({cities, listType}: ListOfCityCardsProps) {
  //const [activeCard, setActiveCard] = useState({id: 0});
  const selectedSortType = useAppSelector((state) => state.sortType);
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

export default OfferCards;

import {Offer} from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type ListOfCityCardsProps = {
  cities: Offer[];
  listType: 'typical' | 'near';
};

function OfferCards({cities, listType}: ListOfCityCardsProps) {
  //const [activeCard, setActiveCard] = useState({id: 0});
  return (
    <div
      className={`${listType === 'typical' ? 'cities__places-list places__list tabs__content' : 'near-places__list places__list'}`}
    >
      {cities.map((city) => (
        <OfferCard key={city.id} offerCardInfo={city} offerCardType={listType}/>
      ))}
    </div>
  );
}

export default OfferCards;

import {Offer} from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type ListOfCityCardsProps = {
  cities: Offer[];
};

function OfferCards({cities}: ListOfCityCardsProps) {
  //const [activeCard, setActiveCard] = useState({id: 0});
  return (
    <div className="cities__places-list places__list tabs__content">
      {cities.map((city) => (
        <OfferCard key={city.id} offerCardInfo={city}/>
      ))}
    </div>
  );
}

export default OfferCards;

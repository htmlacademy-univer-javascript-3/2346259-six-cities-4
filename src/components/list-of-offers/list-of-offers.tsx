import CityCardsSorting from '../city-cards-sorting/city-cards-sorting.tsx';
import OfferCards from '../offer-cards/offer-cards.tsx';
import {Offer} from '../../types/offer.ts';


type ListOffersProps = {
  city: string;
  offers: Offer[];
}


function ListOffers({city, offers}: ListOffersProps): JSX.Element {
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{`${offers.length} places to stay in ${city}`}</b>
      <CityCardsSorting/>
      <OfferCards cities={offers} listType={'typical'}/>
    </section>
  );
}

export default ListOffers;

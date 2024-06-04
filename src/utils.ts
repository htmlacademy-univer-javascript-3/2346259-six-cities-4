import {Offer} from './types/offer';

export const getRating = (rating: number) => `${(rating / 5) * 100}%`;

export const getSorting = (
  offers: Offer[],
  sortType: string
): Offer[] | never => {
  const offersCopy = offers.slice();

  switch (sortType) {
    case 'Popular':
      return offersCopy;
    case 'Price: low to high':
      return offersCopy.sort((offerA, offerB) => offerA.price - offerB.price);
    case 'Price: high to low':
      return offersCopy.sort((offerA, offerB) => offerB.price - offerA.price);
    case 'Top rated first':
      return offersCopy.sort((offerA, offerB) => offerB.rating - offerA.rating);
    default:
      throw new Error('Non-existent sort type');
  }
};

export const updateOffer = (offers: Offer[], updatedOffer: Offer) => {
  const offerIndex = offers.findIndex((el) => el.id === updatedOffer.id);
  if (offerIndex !== -1) {
    offers[offerIndex] = updatedOffer;
  }
};

import { AuthorizationStatus } from '../consts/autorization-status';
import {store} from '../store';
import {ExtendedOffer, Offer} from './offer';
import {Review} from './review';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  userEmail: string | null;
};

export type OffersState = {
  currentOffer: {
    offerInfo: ExtendedOffer | null;
    nearestOffers: Offer[];
    reviews: Review[];
  };
  offers: Offer[];
  selectedMarker: {
    id: string;
  } | null;
  isOffersDataLoading: boolean;
};

export type OtherState = {
  city: string;
  sortType: string;
  error: string | null;
};

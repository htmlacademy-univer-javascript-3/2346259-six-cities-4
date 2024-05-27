import {createReducer} from '@reduxjs/toolkit';
import {ExtendedOffer, Offer} from '../types/offer';

import {
  cityChange,
  sortTypeSelect,
  highlightMarker,
  loadOffers,
  setError,
  requireAuthorization,
  setOffersDataLoadingStatus,
  loadOfferData,
  saveUserEmail,
  sendReview
} from './action';
import {AuthorizationStatus} from '../consts/autorization-status';
import { Review } from '../types/review';

type StateType = {
  currentOffer: {
    offerInfo: ExtendedOffer | null;
    nearestOffers: Offer[];
    reviews: Review[];
  };
  city: string;
  offers: Offer[];
  sortType: string;
  selectedMarker: {
    id: string;
  } | null;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  error: string | null;
  userEmail: string | null;
};

const initialState: StateType = {
  currentOffer: {
    offerInfo: null,
    nearestOffers: [],
    reviews: [],
  },
  city: 'Paris',
  offers: [],
  sortType: 'Popular',
  selectedMarker: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  error: null,
  userEmail: null
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cityChange, (state, {payload}) => {
      state.city = payload;
    })
    .addCase(sortTypeSelect, (state, {payload}) => {
      state.sortType = payload;
    })
    .addCase(highlightMarker, (state, {payload}) => {
      state.selectedMarker = payload;
    })
    .addCase(loadOffers, (state, {payload}) => {
      state.offers = payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(saveUserEmail, (state, action) => {
      state.userEmail = action.payload;
    })
    .addCase(loadOfferData, (state, { payload }) => {
      state.selectedMarker = { id: payload.offerInfo.id };
      state.currentOffer = { ...payload };
    })
    .addCase(sendReview, (state, { payload }) => {
      state.currentOffer.reviews = [...state.currentOffer.reviews, payload];
    });
});

export {reducer};

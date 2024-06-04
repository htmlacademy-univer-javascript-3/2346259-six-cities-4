import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AxiosInstance} from 'axios';
import {ExtendedOffer, Offer} from '../types/offer';
import {
  redirectToRoute,
} from './action.ts';
import {store} from './index.ts';
import {APIRoute, AppRoute, TIMEOUT_SHOW_ERROR} from '../consts/consts.tsx';
import {AuthorizationStatus} from '../consts/autorization-status.tsx';
import {dropToken, saveToken} from '../services/token.ts';
import {UserData} from '../types/user-data.ts';
import {AuthData} from '../types/auth-data.ts';
import {Review} from '../types/review.ts';
import {CommentFormData} from '../types/comment-form-data.ts';
import {saveUserEmail, requireAuthorization} from './user-process/user-process.ts';
import {loadOfferData, loadOffers, sendReview, setOffersDataLoadingStatus} from './offers-process/offer-process.ts';
import {setError} from './other-process/other-process.ts';


export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);


export const fetchOfferDataAction = createAsyncThunk<
  void,
  {
    id: string;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('fetchOfferData', async ({id}, {dispatch, extra: api}) => {
  const {data: offerInfo} = await api.get<ExtendedOffer>(
    `${APIRoute.Offers}/${id}`
  );
  const {data: nearestOffers} = await api.get<Offer[]>(
    `${APIRoute.Offers}/${id}/nearby`
  );
  const {data: reviews} = await api.get<Review[]>(
    `${APIRoute.Comments}/${id}`
  );
  dispatch(loadOfferData({offerInfo, nearestOffers, reviews}));
});


export const sendCommentAction = createAsyncThunk<
  void,
  {
    comment: CommentFormData;
    id: string;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('sendComment', async ({comment, id}, {dispatch, extra: api}) => {
  const {data: review} = await api.post<Review>(
    `${APIRoute.Comments}/${id}`,
    {
      comment: comment.comment,
      rating: comment.rating,
    }
  );
  dispatch(sendReview(review));
});


export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(saveUserEmail(email));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'six-cities/login',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

import {combineReducers} from '@reduxjs/toolkit';
import {userProcess} from './user-process/user-process';
import {otherProcess} from './other-process/other-process.ts';
import {offersProcess} from './offers-process/offer-process.ts';
import { NameSpace } from '../consts/consts.tsx';

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersProcess.reducer,
  [NameSpace.Other]: otherProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});

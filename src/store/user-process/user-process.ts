import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {UserState} from '../../types/state.ts';
import { NameSpace } from '../../consts/consts.tsx';
import { AuthorizationStatus} from '../../consts/autorization-status.tsx';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: '',
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    requireAuthorization(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    },
    saveUserEmail(state, action: PayloadAction<string>) {
      state.userEmail = action.payload;
    },
  },
});

export const { requireAuthorization, saveUserEmail } = userProcess.actions;

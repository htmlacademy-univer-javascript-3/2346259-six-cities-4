import { NameSpace } from '../../consts/consts';
import {State} from '../../types/state';

export const getAuthorizationStatus = (state: State) => state[NameSpace.User].authorizationStatus;
export const getUserEmail = (state: State) => state[NameSpace.User].userEmail;

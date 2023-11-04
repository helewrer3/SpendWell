import React, {createContext} from 'react';

import {Auth, AuthAction, CHANGE_AUTH, CHANGE_LOADING} from './type';

export const AuthContext = createContext<Auth | null>(null);
export const AuthDispatchContext =
  createContext<React.Dispatch<AuthAction> | null>(null);

export const authReducer = (authState: Auth, action: AuthAction): Auth => {
  switch (action.type) {
    case CHANGE_LOADING:
      return {...authState, isLoading: action.isLoading};
    case CHANGE_AUTH:
      return {...authState, token: action.token, isSignedIn: action.isSignedIn};
    default:
      return authState;
  }
};

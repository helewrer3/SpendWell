import React, {createContext} from 'react';

import {Auth, AuthAction, CHANGE_AUTH, CHANGE_LOADING} from './type';

const shutUpAuth: Auth = {
  isLoading: undefined,
  isSignedIn: undefined,
  token: undefined,
};

const shutupAuthAction: AuthAction = {
  type: '',
  isLoading: true,
  isSignedIn: false,
  token: undefined,
};

export const AuthContext = createContext<Auth>(shutUpAuth);
export const AuthDispatchContext = createContext<React.Dispatch<AuthAction>>(
  () => shutupAuthAction,
);

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

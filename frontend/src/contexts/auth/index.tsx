import React, {useContext, useReducer} from 'react';

import {AuthContext, AuthDispatchContext, authReducer} from './context';
import {Auth, AuthProviderProps} from './type';

const initialAuth: Auth = {
  isLoading: true,
  token: undefined,
  isSignedIn: false,
};

const AuthProvider = ({children}: AuthProviderProps): JSX.Element => {
  const [auth, dispatch] = useReducer(authReducer, initialAuth);

  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useAuthDispatch = () => {
  return useContext(AuthDispatchContext);
};

export default AuthProvider;

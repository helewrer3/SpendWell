import {ReactNode} from 'react';

export type Auth = {
  isSignedIn: boolean | undefined;
  token: string | undefined;
  isLoading: boolean | undefined;
};

export type AuthAction = {
  type: string;
  isSignedIn?: boolean;
  token?: string;
  isLoading?: boolean;
};

export type AuthProviderProps = {
  children: ReactNode;
};

export const CHANGE_LOADING = 'CHANGE_LOADING';
export const CHANGE_AUTH = 'CHANGE_AUTH';

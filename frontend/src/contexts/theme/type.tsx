import {ReactNode} from 'react';

export type Theme = {
  theme: string;
};

export type ThemeAction = {
  type: string;
  theme: string;
};

export type ThemeProviderProps = {
  children: ReactNode;
};

export const CHANGE_THEME = 'CHANGE_THEME';

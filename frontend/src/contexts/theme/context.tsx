import React, {createContext} from 'react';

import {CHANGE_THEME, Theme, ThemeAction} from './type';

export const ThemeContext = createContext<Theme | null>(null);
export const ThemeDispatchContext =
  createContext<React.Dispatch<ThemeAction> | null>(null);

export const themeReducer = (themeState: Theme, action: ThemeAction): Theme => {
  switch (action.type) {
    case CHANGE_THEME:
      return {...themeState, theme: action.theme};
    default:
      return themeState;
  }
};

import React, {createContext} from 'react';

import {CHANGE_THEME, Theme, ThemeAction} from './type';
import {LIGHT_THEME} from './data';

const shutUpTheme: Theme = {
  theme: LIGHT_THEME,
};

const shutupThemeAction: ThemeAction = {
  type: '',
  theme: LIGHT_THEME,
};

export const ThemeContext = createContext<Theme>(shutUpTheme);
export const ThemeDispatchContext = createContext<React.Dispatch<ThemeAction>>(
  () => shutupThemeAction,
);

export const themeReducer = (themeState: Theme, action: ThemeAction): Theme => {
  switch (action.type) {
    case CHANGE_THEME:
      return {...themeState, theme: action.theme};
    default:
      return themeState;
  }
};

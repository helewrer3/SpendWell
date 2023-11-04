import React, {useContext, useReducer} from 'react';

import {Theme, ThemeProviderProps} from './type';
import {DARK_THEME} from './data';
import {ThemeContext, ThemeDispatchContext, themeReducer} from './context';

const initialTheme: Theme = {
  theme: DARK_THEME,
};

const ThemeProvider = ({children}: ThemeProviderProps): JSX.Element => {
  const [theme, dispatch] = useReducer(themeReducer, initialTheme);

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={dispatch}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const useThemeDispatch = () => {
  return useContext(ThemeDispatchContext);
};

export default ThemeProvider;

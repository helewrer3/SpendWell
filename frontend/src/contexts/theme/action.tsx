import {retrieveSession, storeSession} from '../../utils/localStorage';
import {LIGHT_THEME} from './data';
import {CHANGE_THEME, ThemeAction} from './type';

export const changeTheme = async (
  dispatch: React.Dispatch<ThemeAction>,
  theme: string,
) => {
  dispatch({
    type: CHANGE_THEME,
    theme,
  });
  await storeSession({name: 'theme', data: {value: theme}});
};

export const setTheme = async (dispatch: React.Dispatch<ThemeAction>) => {
  const theme = await retrieveSession({name: 'theme'});
  dispatch({
    type: CHANGE_THEME,
    theme: theme ? JSON.parse(theme).value : LIGHT_THEME,
  });
};

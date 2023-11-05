import {
  removeSession,
  retrieveSession,
  storeSession,
} from '../../utils/localStorage';
import {AuthAction, CHANGE_AUTH} from './type';

export const changeAuth = async (
  dispatch: React.Dispatch<AuthAction>,
  token: string,
) => {
  dispatch({
    type: CHANGE_AUTH,
    isSignedIn: true,
    token,
  });
  await storeSession({name: 'auth_token', data: {value: token}});
};

export const removeAuth = async (dispatch: React.Dispatch<AuthAction>) => {
  dispatch({
    type: CHANGE_AUTH,
    isSignedIn: false,
    token: undefined,
  });
  await removeSession({name: 'auth_token'});
};

export const setAuth = async (dispatch: React.Dispatch<AuthAction>) => {
  const token = await retrieveSession({name: 'auth_token'});
  if (token)
    dispatch({
      type: CHANGE_AUTH,
      isSignedIn: true,
      token: JSON.parse(token).value,
    });
};

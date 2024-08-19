/* eslint-disable no-unused-vars */
import { getCartLights } from '../../api/cart-api';
import { login, logout, register } from '../../api/requester';

import { useAuthContext } from '../contexts/AuthContext';

export const useLogin = () => {
  const { changeAuthState } = useAuthContext();

  const loginHandler = async (email, password) => {
    const { password: _, ...authData } = await login(email, password);

    if (authData.userCart.length > 0) {
      const lightsInCart = await getCartLights(authData.userCart);

      authData.userCart.splice(0, authData.userCart.length, ...lightsInCart);
    }
    changeAuthState(authData);

    return authData;
  };

  return loginHandler;
};

export const useRegister = () => {
  const { changeAuthState } = useAuthContext();

  const registerHandler = async (email, password) => {
    const { password: _, ...authData } = await register(email, password);

    changeAuthState(authData);

    return authData;
  };

  return registerHandler;
};

export const useLogout = () => {
  const { logout: localLogout } = useAuthContext();

  const logoutHandler = async () => {
    await logout();
    localLogout();
  };

  return logoutHandler;
};

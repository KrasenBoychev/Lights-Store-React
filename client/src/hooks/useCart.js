import { useEffect, useState } from 'react';
import { getCartLights } from '../../api/data';
import { useAuthContext } from '../contexts/AuthContext';

export default function useCart() {
  const [cart, setCart] = useState({});
  const [spinner, setSpinner] = useState(false);

  const { userCart, changeAuthState } = useAuthContext();

  useEffect(() => {
    (async function getAllLights() {
      try {
        setSpinner(true);
        const {lightsInCart} = await getCartLights(userCart);

        if (lightsInCart.length != useCart.length) {
          changeAuthState({userCart: lightsInCart});
        }

        setCart(lightsInCart);
      } catch (err) {
        return;
      } finally {
        setSpinner(false);
      }
    })();
  }, []);

  return [cart, setCart, spinner];
}

import { useEffect, useState } from 'react';
import { getCartLights } from '../../api/data';

export default function useCart(authData) {
  const [cart, setCart] = useState([]);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    (async function getAllLights() {
      try {
        setSpinner(true);

        const lightsInCart = await getCartLights(authData.userCart);

        if (lightsInCart.length != authData.userCart.length) {
          // const cartArr = cart.map((light) => light._id);

          // authData.userCart = cartArr;
          //authData.changeAuthState((...authData) => authData);
        }

        setCart(lightsInCart);
      } catch (err) {
        return;
      } finally {
        setSpinner(false);
      }
    })();
  }, [authData.userCart]);

  return [cart, setCart, spinner];
}

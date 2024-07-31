import { useEffect, useState } from 'react';
import { getCartLights } from '../../api/data';

export default function useCart(authData) {
  const [cart, setCart] = useState({});
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    (async function getAllLights() {
      try {
        setSpinner(true);

        const lightsInCart = await getCartLights(authData.userCart);
        const cartArr = lightsInCart.map((light) => light._id);
        
        if (lightsInCart.length != authData.userCart.length) {
          authData.userCart = cartArr;
          authData.changeAuthState(authData);
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

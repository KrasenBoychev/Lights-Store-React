import { useEffect, useState } from 'react';
import { getCart, getCartLights } from '../../api/data';
import { useAuthContext } from '../contexts/AuthContext';

export default function useCart() {
  const [cart, setCart] = useState({});
  const [spinner, setSpinner] = useState(false);

  const { userId } = useAuthContext();

  useEffect(() => {
    (async function getAllLights() {
      try {
        setSpinner(true);

        const cartLightsId = await getCart(userId);
        const lightsInCart = await getCartLights(cartLightsId);

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

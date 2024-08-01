import { useEffect, useState } from 'react';
import { getCartLights } from '../../api/data';
import { useAuthContext } from '../contexts/AuthContext';

export default function useCart() {
  const [cart, setCart] = useState([]);
  const [spinner, setSpinner] = useState(false);

  const authData = useAuthContext();

  useEffect(() => {
    (async function getAllLights() {
      try {
        setSpinner(true);

        if (authData.userCart.length == 0) {
          setCart([]);

        } else {
          const lightsInCart = await getCartLights(authData.userCart);
          setCart(lightsInCart);

          if (lightsInCart.length != authData.userCart.length) {
            const cartArr = lightsInCart.map((light) => light._id);
            
            authData.userCart.splice(0, authData.userCart.length, ...cartArr);
            authData.changeAuthState(authData);
          }
        }
      
      } catch (err) {
        return;
      } finally {
        setSpinner(false);
      }
    })();
  }, [authData]);

  return [cart, setCart, spinner];
}

/* eslint-disable react/prop-types */
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

import { addToCart } from '../../../../../api/cart-api';
import { decreaseQuantities } from '../../../../../api/lights-api';

import { useAuthContext } from '../../../../contexts/AuthContext';

export default function BuyButton({ props }) {
  const { light, setBoughtItem, setLightQuantities, navigate } = props;

  const location = useLocation();
  const authData = useAuthContext();

  const buyClickHandler = async () => {
    if (!authData.userId) {
      navigate('/login', {state: location.pathname});
      return;
    }

    try {
      await decreaseQuantities(light._id);
      
      await addToCart(light._id);

      authData.userCart.push(light);
      authData.changeAuthState(authData);

      setBoughtItem(true);

      setLightQuantities(light.quantities - 1);

    } catch (error) {
      toast(error.message);
    } 
  };

  return <button onClick={buyClickHandler}>Buy</button>;
}

/* eslint-disable react/prop-types */
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

import { addToCart } from '../../../../../api/cart-api';

import { useAuthContext } from '../../../../contexts/AuthContext';

export default function BuyButton({ props }) {
  const { light, setBoughtItem, navigate } = props;

  const location = useLocation();
  const authData = useAuthContext();

  const buyClickHandler = async () => {
    if (!authData.userId) {
      navigate('/login', {state: location.pathname});
      return;
    }

    try {
      await addToCart(light._id);

      authData.userCart.push(light._id);
      authData.changeAuthState(authData);

      setBoughtItem(true);

    } catch (error) {
      toast(error.message);
    }
  };

  return <button onClick={buyClickHandler}>Buy</button>;
}

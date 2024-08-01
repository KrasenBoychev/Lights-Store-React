/* eslint-disable react/prop-types */
import { addToCart } from '../../../../../api/data';
import { useAuthContext } from '../../../../contexts/AuthContext';

export default function BuyButton({props}) {
  const {light, setBoughtItem, navigate} = props;

  const authData = useAuthContext();

  const buyClickHandler = async () => {
    if (!authData.userId) {
      navigate('/login');
      return;
    }

    try {
      await addToCart(light._id);

      authData.userCart.push(light._id);
      authData.changeAuthState(authData);

    } catch (error) {
      alert(error.message);
    }

    setBoughtItem(true);
  };

  return <button onClick={buyClickHandler}>Buy</button>;
}

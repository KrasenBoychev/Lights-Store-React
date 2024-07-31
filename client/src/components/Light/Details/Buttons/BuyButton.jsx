/* eslint-disable react/prop-types */
import { addToCart } from '../../../../../api/data';

export default function BuyButton({props}) {
  const {light, userId, setBoughtItem, navigate} = props;


  const buyClickHandler = async () => {
    if (!userId) {
      navigate('/login');
      return;
    }

    try {
      await addToCart(light._id);
    } catch (error) {
      alert(error.message);
    }

    setBoughtItem(true);
  };

  return <button onClick={buyClickHandler}>Buy</button>;
}

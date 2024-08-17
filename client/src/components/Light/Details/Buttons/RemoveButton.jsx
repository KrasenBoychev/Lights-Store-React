/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { removeLightFromCart } from '../../../../../api/cart-api';
import { increaseQuantities } from '../../../../../api/lights-api';

import { useAuthContext } from '../../../../contexts/AuthContext';

import Spinner from '../../../Spinner';

export default function RemoveButton({props}) {
  const { light, setLightQuantities } = props;
  const authData = useAuthContext();

  const navigate = useNavigate();
  const location = useLocation();

  const currPage = location.pathname.split('/');

  const [spinner, setSpinner] = useState(false);

  const removeClickHandler = async () => {

    try {
        setSpinner(true);

        await removeLightFromCart(light._id);

        const lightIndex = authData.userCart.indexOf(light._id);

        if (lightIndex !== -1) {
          authData.userCart.splice(lightIndex, 1);
          authData.changeAuthState(authData);
          
        } else {
          toast('Light does not exist');

          if (currPage == 'cart') {
            navigate(0);
          } else {
            navigate('/cart');
          }
        }
        
        if (currPage.length == 2) {
            navigate(0);
        } else {
            navigate('/cart');
        }

        await increaseQuantities(light._id);

    } catch(error) {
        toast(error.message);

    } finally {
        setSpinner(false);
    }
  };

  return (
    <>
    {spinner 
        ? <Spinner />
        :  <button onClick={removeClickHandler}>Remove</button>}
    </>
  );
}

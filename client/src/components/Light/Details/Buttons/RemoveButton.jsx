/* eslint-disable react/prop-types */
import { useState } from 'react';
import { removeLightFromCart } from '../../../../../api/data';
import Spinner from '../../../Spinner';
import { useActionData, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

export default function RemoveButton({props}) {
  const { light } = props;
  const authData = useAuthContext();

  const navigate = useNavigate();
  const location = useLocation();

  const currPage = location.pathname.split('/');

  const [spinner, setSpinner] = useState(false);

  const removeClickHandler = async () => {
    setSpinner(true);
    try {
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
    } catch(error) {
        alert(error.message);
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

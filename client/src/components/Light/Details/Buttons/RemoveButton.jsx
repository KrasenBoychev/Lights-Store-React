/* eslint-disable react/prop-types */
import { useState } from 'react';
import { removeLightFromCart } from '../../../../../api/data';
import Spinner from '../../../Spinner';
import { useLocation, useNavigate } from 'react-router-dom';

export default function RemoveButton({props}) {
  const { light } = props;

  const navigate = useNavigate();
  const location = useLocation();

  const currPage = location.pathname.split('/');

  const [spinner, setSpinner] = useState(false);

  const removeClickHandler = async () => {
    setSpinner(true);
    try {
        await removeLightFromCart(light._id);

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

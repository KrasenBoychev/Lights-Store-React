import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { addToCart, deleteRecord, getCart, getLightById } from '../../api/data';

export function useLightDetails() {
  const [spinner, setSpinner] = useState(false);
  const [light, setLight] = useState({});
  const { lightId } = useParams();
  const location = useLocation();
  const currPage = location.pathname.split('/')[1];
 
  useEffect(() => {
    (async function getLight() {
      try {
        setSpinner(true);
        const getlight = await getLightById(lightId);

        if (currPage == 'catalog') {
          // if (light.ownerId != '668cfe59f18d95a1f2f52a13') {
          //   navigate('/catalog');
          //   throw new Error('Not Authorized');
          // }
        } else if (currPage == 'marketplace') {
          // if (
          //   light.ownerId == '668cfe59f18d95a1f2f52a13' ||
          //   light.ownerId == sessionStorage.userId
          // ) {
          //   navigate('/marketplace');
          //   throw new Error('Not Authorized');
          // }
        } else if (currPage == 'profile') {
          // if (light.ownerId != sessionStorage.userId) {
          //   navigate('/profile');
          //   throw new Error('Not Authorized');
          // }
        }

        setLight(getlight);
      } catch (error) {
        alert(error.message);
      } finally {
        setSpinner(false);
      }
    })();
  }, [lightId]);

  return [light, setLight, spinner, setSpinner, currPage];
}

export function useBoughtLight(userId, lightId) {
  const [boughtItem, setBoughtItem] = useState(false);

  useEffect(() => {
    //const abortController = new AbortController();

    (async function checkIfBought() {
      const userCart = await getCart(userId); //{signal: abortController.signal}

      if (userCart.includes(lightId)) {
        setBoughtItem(true);
      }
    })();

    //return () => abortController.abort();
  }, [lightId]);

  return [
    boughtItem, 
    setBoughtItem
  ];
}

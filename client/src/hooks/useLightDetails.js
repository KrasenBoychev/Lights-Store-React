import { useEffect, useState } from 'react';
import {  useLocation, useParams } from 'react-router-dom';

import { getLightById } from '../../api/lights-api';

import { useAuthContext } from '../contexts/AuthContext';

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

export function useBoughtLight(lightId) {
  const [boughtItem, setBoughtItem] = useState(false);

  const { userCart } = useAuthContext();

  useEffect(() => {
    (function checkIfBought() {
      if (!userCart) {
        return;
      }

      if (userCart.includes(lightId)) {
        setBoughtItem(true);
      }
    })();
  }, [lightId]);

  return [
    boughtItem, 
    setBoughtItem
  ];
}

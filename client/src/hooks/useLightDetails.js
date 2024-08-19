import { useEffect, useState } from 'react';
import {  useLocation, useNavigate, useParams } from 'react-router-dom';

import { getLightById } from '../../api/lights-api';
import { adminId } from '../../api/requester';

import { useAuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export function useLightDetails() {
  const [spinner, setSpinner] = useState(false);
  const [light, setLight] = useState({});
  const [lightQuantities, setLightQuantities] = useState(0);

  const { lightId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { userId, userCart } = useAuthContext();

  const currPage = location.pathname.split('/')[1];
 
  useEffect(() => {
    (async function getLight() {
      try {
        setSpinner(true);
        const getLight = await getLightById(lightId);

        if (currPage == 'catalog' && getLight.ownerId != adminId) {
          toast.error('Access Denied');
          navigate('/catalog');
        }

        if (currPage == 'marketplace' && (getLight.ownerId == adminId || getLight.ownerId == userId)) {
          toast.error('Access Denied');
          navigate('/marketplace');
        }

        if (currPage == 'profile' && getLight.ownerId != userId) {
          toast.error('Access Denied');
          navigate('/profile');
        }

        const currLightId = getLight._id;
        if (currPage == 'cart' && !userCart.find(light => light._id === currLightId)) {
          toast.error('Access Denied');
          navigate('/cart');
        }

        setLightQuantities(getLight.quantities);
        setLight(getLight);
      
      } catch (error) {
        alert(error.message);
      } finally {
        setSpinner(false);
      }
    })();
  }, [lightId]);

  return [light, setLight, lightQuantities, setLightQuantities, spinner, setSpinner, currPage];
}

export function useBoughtLight(light) {
  const [boughtItem, setBoughtItem] = useState(false);

  const { userCart } = useAuthContext();

  useEffect(() => {
    (function checkIfBought() {
      if (!userCart) {
        return;
      }

      const lightId = light._id;

      if (userCart.find(light => light._id === lightId)) {
        setBoughtItem(true);
      }
    })();
  }, [light]);

  return [
    boughtItem, 
    setBoughtItem
  ];
}

import { useEffect, useState } from 'react';
import {  useLocation, useNavigate, useParams } from 'react-router-dom';

import { getLightById } from '../../api/lights-api';
import { adminId } from '../../api/requester';

import { useAuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export function useLightDetails() {
  const [spinner, setSpinner] = useState(false);
  const [light, setLight] = useState({});

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

        if (currPage == 'cart' && !userCart.includes(getLight._id)) {
          toast.error('Access Denied');
          navigate('/cart');
        }

        setLight(getLight);
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

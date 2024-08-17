import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useLogout } from './useAuth';

export function useAllLights(props) {
  const [spinner, setSpinner] = useState(false);
  const [lights, setLights] = useState([]);
  const [filteredLights, setFilteredLights] = useState([]);

  const location = useLocation();
  const currPage = location.pathname.split('/')[1];

  const navigate = useNavigate();
  const logout = useLogout();

  const [seacrhFormValues, setSearchFormValues] = useState({});

  useEffect(() => {
    (async function getAllLights() {
      try {
        setSpinner(true);
        const allLights = await props.getDataFunc();
        setLights(allLights);

        if (location.state) {
          const filteredItems = allLights.filter((light) =>
            location.state === 'integratedLed'
              ? light.kelvins
              : light.bulbType
          );
          setFilteredLights(filteredItems);

        } else {
          setFilteredLights(allLights);
        }

        setSearchFormValues({
          name: '',
          minPrice: '',
          maxPrice: '',
          lightType: location.state
            ? location.state 
            : ''
        });

      } catch (error) {
        toast(error.message);

        logout();
        navigate('/');
      } finally {
        setSpinner(false);
      }
    })();
  }, [props.getDataFunc]);

  return [
    lights,
    setLights,
    filteredLights,
    setFilteredLights,
    seacrhFormValues,
    setSearchFormValues,
    spinner,
    currPage,
  ];
}

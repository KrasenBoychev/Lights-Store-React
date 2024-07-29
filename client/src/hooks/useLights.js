import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLogout } from './useAuth';

export function useAllLights(props) {
  const [spinner, setSpinner] = useState(false);
  const [lights, setLights] = useState([]);
  const [filteredLights, setFilteredLights] = useState([]);

  const navigate = useNavigate();
  const logout = useLogout();

  const [seacrhFormValues, setSearchFormValues] = useState({
    name: '',
    price: '',
    lightType: location.state
      ? location.state === 'integratedLed'
        ? 'integratedLed'
        : 'bulbType'
      : '',
  });

  useEffect(() => {
    (async function getAllLights() {
      try {
        setSpinner(true);
        const allLights = await props.getDataFunc();
        setLights(allLights);

        if (seacrhFormValues.lightType != '') {
          const filteredItems = allLights.filter((light) =>
            seacrhFormValues.lightType == 'integratedLed'
              ? light.kelvins
              : light.bulbType
          );
          setFilteredLights(filteredItems);
        } else {
          setFilteredLights(allLights);
        }
      } catch (err) {
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
  ];
}

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getCatalogLights } from '../../../../api/lights-api';

export function useCatalogLights() {
    const [spinner, setSpinner] = useState(false);
    const [lights, setLights] = useState([]);
    const [filteredLights, setFilteredLights] = useState([]);
    const [seacrhFormValues, setSearchFormValues] = useState({});
    const [sort, setSort] = useState('nameAscending');

    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
      (async function getAllLights() {
        try {
          setSpinner(true);
          const allLights = await getCatalogLights();
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
          navigate('/');
          
        } finally {
          setSpinner(false);
        }
      })();
    }, []);
  
    return [
      lights,
      setLights,
      filteredLights,
      setFilteredLights,
      seacrhFormValues,
      setSearchFormValues,
      sort, 
      setSort,
      spinner,
    ];
  }
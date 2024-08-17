import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useLogout } from './useAuth';

export function useAllLights(props) {
  const [spinner, setSpinner] = useState(false);
  const [lights, setLights] = useState([]);
  const [filteredLights, setFilteredLights] = useState([]);
  const [seacrhFormValues, setSearchFormValues] = useState({});
  const [sort, setSort] = useState('nameAscending');

  const navigate = useNavigate();
  const logout = useLogout();

  const location = useLocation();
  const currPage = location.pathname.split('/')[1];

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
    sort, 
    setSort,
    spinner,
    currPage,
  ];
}

export function useSortAndPaginate(filteredLights, sort) {
  const sortMethods = {
    'nameAscending': { method: (a, b) => a.name.localeCompare(b.name) },
    'nameDescending': { method: (a, b) => b.name.localeCompare(a.name) },
    'priceAscending': { method: (a, b) => a.price - b.price },
    'priceDescending': { method: (a, b) => b.price - a.price },
  };

  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 4;

  const items = filteredLights ? filteredLights.sort(sortMethods[sort].method) : '';

  const endOffset = itemOffset + itemsPerPage;
 
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return [currentItems, pageCount, handlePageClick];
}

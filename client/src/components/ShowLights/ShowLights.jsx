/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import CatalogLight from '../Light/CatalogLight/CatalogLight';
import Spinner from '../Spinner';
import CreateLightParagraph from './CreateLightParagraph';
import Search from './Search';
import './ShowLights.css';

export default function ShowLights(props) {
  const [spinner, setSpinner] = useState(false);
  const [lights, setLights] = useState([]);
  const [filteredLights, setFilteredLights] = useState([]);

  const location = useLocation();
  const currPage = location.pathname.split('/')[1];

  const [seacrhFormValues, setSearchFormValues] = useState({
    name: '',
    price: '',
    lightType: location.state ? (location.state === 'integratedLed' ? 'integratedLed' : 'bulbType') : ''
  });
 

  useEffect(() => {
    (async function getAllLights() {
      try {
        setSpinner(true);
        const allLights = await props.getDataFunc();
        setLights(allLights);
        
        if (seacrhFormValues.lightType != '') {
          const filteredItems = allLights.filter(
           (light) => seacrhFormValues.lightType == 'integratedLed' ? light.kelvins : light.bulbType
         );
           setFilteredLights(filteredItems);
         } else {
           setFilteredLights(allLights);
         }
         
      } catch (err) {
        alert(err.message);
      } finally {
        setSpinner(false);
      }
    })();
  }, [props.getDataFunc]);

  return (
    <div className="catalog_section">
      <h1>{currPage == 'profile' ? 'My Lights' : currPage == 'marketplace' ? 'Welcome to ' + currPage : 'Our range of lights'}</h1>

      {currPage == 'profile' ? (
        <CreateLightParagraph />
      ) : currPage != 'profile' ? (
        <Search
          lightsState={{ lights, setLights }}
          filteredLightsState={{ filteredLights, setFilteredLights }}
          searchFormProps = {{ seacrhFormValues, setSearchFormValues }}
        />
      ) : (
        ''
      )}

      <div className="items-container">
        {spinner ? (
          <Spinner />
        ) : filteredLights.length > 0 ? (
          filteredLights.map((light) => {
            return <CatalogLight key={light._id} light={light} />;
          })
        ) : (
          <p>There are no lights available at the moment</p>
        )}
      </div>
    </div>
  );
}

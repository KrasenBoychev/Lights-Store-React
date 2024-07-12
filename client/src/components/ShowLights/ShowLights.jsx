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

  useEffect(() => {
    (async function getAllLights() {
      try {
        setSpinner(true);
        const allLights = await props.getDataFunc();
        setLights(allLights);
        setFilteredLights(allLights);
      } catch (err) {
        alert(err.message);
      } finally {
        setSpinner(false);
      }
    })();
  }, [props.getDataFunc]);

  return (
    <div className="catalog_section">
      <h1>
          {currPage == 'profile' 
              ? 'My Lights'
              : 'Welcome to ' + currPage
        }
      </h1>

      {currPage == 'profile' ? (
        <CreateLightParagraph />
      ) : (
        currPage == 'marketplace' 
          ? (
            <Search lightsState={{lights, setLights}} filteredLightsState={{filteredLights, setFilteredLights}}/>
          ) : (
            ''
          )
      )}

      <div className="items-container">
        {spinner ? (
          <Spinner />
        ) : filteredLights.length > 0 ? (
          filteredLights.map((light) => {
            if (currPage == 'catalog') {
              light.showDate = false;
              light.showNotes = false;
            } else {
              light.showDate = true;
              light.showNotes = true;
            }
            return <CatalogLight key={light._id} light={light} />;
          })
        ) : (
          <p>There are no lights available at the moment</p>
        )}
      </div>
    </div>
  );
}

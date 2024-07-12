/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import CatalogLight from '../Light/CatalogLight/CatalogLight';
import Spinner from '../Spinner';
import './ShowLights.css';
import CreateLightParagraph from './CreateLightParagraph';

export default function ShowLights(props) {
  const [spinner, setSpinner] = useState(false);
  const [lights, setLights] = useState([]);

  useEffect(() => {
    (async function getAllLights() {
      try {
        setSpinner(true);
        const allLights = await props.getDataFunc();
        setLights(allLights);
      } catch (err) {
        alert(err.message);
      } finally {
        setSpinner(false);
      }
    })();
  }, [props.getDataFunc]);

  return (
    <div className="catalog_section">
      <h1>Welcome to {props.page}</h1>

      {props.page == 'marketplace' || props.page == 'profile' ? (
        <CreateLightParagraph />
      ) : (
        ''
      )}

      <div className="items-container">
        {spinner ? (
          <Spinner />
        ) : lights.length > 0 ? (
          lights.map((light) => {
            if (props.page == 'catalog') {
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

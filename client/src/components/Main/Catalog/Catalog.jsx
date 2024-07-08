import { useEffect, useState } from 'react';
import { getLights } from '../../../../api/data';
import CatalogLight from '../../Light/CatalogLight/CatalogLight';
import './Catalog.css';

export default function Catalog() {
  const [lights, setLights] = useState([]);

  useEffect(() => {
    (async function getAllLights() {
      try {
        const allLights = await getLights();
        setLights(allLights);
      } catch (err) {
        alert(err.message);
      }
    })();
  }, []);

  return (
    <div className="catalog_section">
      <h1>Catalog</h1>

      <div className="items-container">
        {lights.length > 0 ? (
          lights.map((light) => {
            return <CatalogLight key={light._id} light={light} />;
          })
        ) : (
          <p>There are no lights available at the moment</p>
        )}
      </div>
    </div>
  );
}

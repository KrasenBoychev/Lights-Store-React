import './css/Catalog.css';
import { getLights } from '../../api/data';
import { useEffect, useState } from 'react';
import CatalogLight from './CatalogLight';

export default function Catalog() {
  const [lights, setLights] = useState([]);

  useEffect(() => {
    async function getAllLights() {
      const allLights = await getLights();
      setLights(allLights);
    }

    getAllLights();
  }, []);

  return (
    <div className="catalog_section">
      <h1>Catalog</h1>

      <div className="items-container">
        {lights.length > 0 ? (
          lights.map((light) => {
            return (
              <div key={light._id} className="item-wrapper">
                <CatalogLight light={light} />
              </div>
            );
          })
        ) : (
          <p>There are no lights available at the moment</p>
        )}
      </div>
    </div>
  );
}

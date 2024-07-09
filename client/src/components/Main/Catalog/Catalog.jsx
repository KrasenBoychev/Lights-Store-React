import { useEffect, useState } from 'react';
import { getCatalogLights } from '../../../../api/data';
import CatalogLight from '../../Light/CatalogLight/CatalogLight';
import './Catalog.css';

export default function Catalog() {
  const [lights, setLights] = useState([]);

  useEffect(() => {
    (async function getAllLights() {
      try {
        const allLights = await getCatalogLights('668cfe59f18d95a1f2f52a13');
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
            light.showDate = false;
            light.showNotes = false;
            return <CatalogLight key={light._id} light={light} />;
          })
        ) : (
          <p>There are no lights available at the moment</p>
        )}
      </div>
    </div>
  );
}

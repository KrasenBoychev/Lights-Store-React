import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMarketplaceLights } from '../../../../api/data';
import CatalogLight from '../../Light/CatalogLight/CatalogLight';
import '../Catalog/Catalog.css';
import './Marketplace.css';

export default function Marketplace() {
  const [lights, setLights] = useState([]);

  useEffect(() => {
    (async function getLights() {
      try {
        const allLights = await getMarketplaceLights();
        setLights(allLights);
      } catch (err) {
        alert(err.message);
      }
    })();
  }, []);
  return (
    <div className="catalog_section">
      <h1>Welcome to Marketplace</h1>
      <p>
        <Link className="nav-link" to="/createlight">
          Give your old light a new life
        </Link>
      </p>

      <div className="items-container">
        {lights.length > 0 ? (
          lights.map((light) => {
            light.showDate = true;
            light.showNotes = true;
            return <CatalogLight key={light._id} light={light} />;
          })
        ) : (
          <p>There are no lights available at the moment</p>
        )}
      </div>
    </div>
  );
}

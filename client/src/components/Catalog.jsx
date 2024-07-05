import CatalogLight from './CatalogLight';
import './css/Catalog.css';

export default function Catalog() {
  return (
    <div className="catalog_section">
        <h1>Catalog</h1>

        <div className='items-container'>
          <CatalogLight />
        </div>
    </div>
  );
}

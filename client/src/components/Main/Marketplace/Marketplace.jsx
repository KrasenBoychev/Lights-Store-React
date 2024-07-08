
import CatalogLight from '../../Light/CatalogLight/CatalogLight';
import '../Catalog/Catalog.css';
import './Marketplace.css';

export default function Marketplace() {
  return (
    <div className="catalog_section">
        <h1>Welcome to Marketplace</h1>
        <p><a href="#">Give your old light a new life</a></p>

        <div className='items-container'>
          <CatalogLight />
        </div>
    </div>
  );
}

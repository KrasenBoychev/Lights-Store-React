/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import './CatalogLight.css';

export default function CatalogLight({ light }) {
  const { imageURL, name, price, _id } = light;

  return (
    <div className="item-wrapper">
      <div className="container_main">
        <img src={imageURL} />
        <div className="overlay">
          <Link className="icon" title="User Profile" to={_id} state={{ light }}>
              <i className="fa fa-search"></i>
          </Link>
        </div>
      </div>
      <p className="item-name">{name}</p>
      <p className="item-price">{price.toFixed(2)}lv.</p>
    </div>
  );
}

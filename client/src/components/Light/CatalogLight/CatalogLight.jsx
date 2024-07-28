/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import './CatalogLight.css';

export default function CatalogLight({ imageURL, name, price, _id }) {

  return (
    <div className="item-wrapper">
      <div className="container_main">
        <img src={imageURL} />
        <div className="overlay">
          <Link to={_id} className="icon" title="User Profile">
              <i className="fa fa-search"></i>
          </Link>
        </div>
      </div>
      <p className="item-name">{name}</p>
      <p className="item-price">{price.toFixed(2)}lv.</p>
    </div>
  );
}

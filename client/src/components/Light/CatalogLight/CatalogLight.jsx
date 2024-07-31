/* eslint-disable react/prop-types */
import { Link, useLocation } from 'react-router-dom';
import './CatalogLight.css';
import RemoveButton from '../Details/Buttons/RemoveButton';

export default function CatalogLight(light) {
  const location = useLocation();
  const currPage = location.pathname.split('/')[1];

  const { imageURL, name, price, _id } = light;

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
      {currPage == 'cart' && <RemoveButton props={{ light }}/>}
    </div>
  );
}

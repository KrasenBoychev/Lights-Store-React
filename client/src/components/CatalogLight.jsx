/* eslint-disable react/prop-types */
import './css/CatalogLight.css';

export default function CatalogLight({ imageURL, name, price }) {
  return (
    <div className="item-wrapper">
      <div className="container_main">
        <img src={imageURL} />
        <div className="overlay">
          <a href="#" className="icon" title="User Profile">
            <i className="fa fa-search"></i>
          </a>
        </div>
      </div>
      <p className="item-name">{name}</p>
      <p className="item-price">{price}lv.</p>
    </div>
  );
}

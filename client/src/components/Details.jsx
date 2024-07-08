import './css/Details.css';
import { useLocation } from 'react-router-dom';

export default function Details() {
  const location = useLocation();
  const { light } = location.state; 

  const { height, width, depth } = light.dimensions.split('/');

  return (
    <div className="details_section layout">
      <div className="item-details">
        <div className="item-details-img">
          <img src={light.imageURL} />
        </div>
        <div className="item-details-more-info">
          <p>{light.name}</p>
          <p>{light.price}lv.</p>
          <p>In stock: {light.quantities}</p>
          <ul className="item-details-description">
            <li>Dimensions: H{height}xW{width}xD{depth} cm.</li>
            {light.minHeight ? <li>Adjustable height - Drop between {light.minHeight} to {light.maxHeight} cm.s</li> : ''}
            {light.kelvins 
                ? <>
                    <li>Integrated LED</li>
                    <li>{light.kelvins} Kelvins</li>
                    <li>{light.lumens} Lumens</li>
                    <li>{light.watt} Watts</li>
                  </>
                : ''
            }
            {light.bulbType 
                ? <>
                    <li>Bulb Type: {light.bulbType}</li>
                    <li>Bulbs Required: {light.bulbsRequired}</li>
                  </>
                : ''
            }
            {light.notes ? <li>Notes: {light.notes}</li> : ''}
            {light.date ? <li>Date of purchase: {light.date}</li> : ''}
          </ul>
        </div>
        <div className="item-details-button">
          <button>Buy</button>
        </div>
      </div>

      <div className="comments-wrapper"></div>
    </div>
  );
}

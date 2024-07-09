import { useLocation } from 'react-router-dom';
import './Details.css';

export default function Details() {
  const location = useLocation();
  const { light } = location.state; 

  const [ height, width, depth ] = light.dimensions.split('/');
  
  return (
    <div className="details_section layout">
      <div className="item-details">
        <div className="item-details-img">
          <img src={light.imageURL} />
        </div>
        <div className="item-details-more-info">
          <p>{light.name}</p>
          <p>{light.price.toFixed(2)}lv.</p>
          <p>{light.quantities} In Stock</p>
          <ul className="item-details-description">
            <li>Dimensions: H{height} x W{width } x D{depth} cm.</li>
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
            {light.showNotes ? light.notes ? <li>Notes: {light.notes}</li> : '' : ''}
            {light.showDate ? <li>Date of purchase: {light.date}</li> : ''}
          </ul>
        </div>

        <div className="item-details-button">
          <button>Buy</button>
        </div>
      </div>
    </div>
  );
}

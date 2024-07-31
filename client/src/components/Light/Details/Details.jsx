/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Spinner';
import ProfileButtons from './Buttons/ProfileButtons';
import BuyButton from './Buttons/BuyButton';
import RemoveButton from './Buttons/RemoveButton';
import './Details.css';
import { useLightDetails, useBoughtLight } from '../../../hooks/useLightDetails';
import { useAuthContext } from '../../../contexts/AuthContext';

export default function Details() {
  const navigate = useNavigate();
  const { userId } = useAuthContext();

  const [light, setLights, spinner, setSpinner, currPage] = useLightDetails();

  const [boughtItem, setBoughtItem] = useBoughtLight(light._id);

  let height;
  let width;
  let depth;
  if (light.dimensions) {
    [height, width, depth] = light.dimensions.split('/');
  }

  return (
    <div className="details_section layout">
      {spinner ? (
        <Spinner />
      ) : (
        <div className="item-details">
          <div className="item-details-img">
            <img src={light.imageURL} />
          </div>
          <div className="item-details-more-info">
            <p>{light.name}</p>
            <p>{light.price ? light.price.toFixed(2) : ''}lv.</p>
            <p>{light.quantities} In Stock</p>
            <ul className="item-details-description">
              <li>
                Dimensions: H{height} x W{width} x D{depth} cm.
              </li>

              {light.minHeight && (
                <li>
                  Adjustable height - Drop between {light.minHeight} to{' '}
                  {light.maxHeight} cm.s
                </li>
              )}

              {light.kelvins && (
                <>
                  <li>Integrated LED</li>
                  <li>{light.kelvins} Kelvins</li>
                  <li>{light.lumens} Lumens</li>
                  <li>{light.watt} Watts</li>
                </>
              )}

              {light.bulbType && (
                <>
                  <li>Bulb Type: {light.bulbType}</li>
                  <li>Bulbs Required: {light.bulbsRequired}</li>
                </>
              )}

              {currPage != 'catalog' && light.notes && (
                  <li>Notes: {light.notes}</li>
                )
              }

              {currPage != 'catalog' && (
                <li>Date of purchase: {light.date}</li>
              )}
              
            </ul>
          </div>

          <div className="item-details-button">
            {currPage == 'profile' && <ProfileButtons props={{light, setSpinner, navigate}}/> }

            {currPage == 'cart' && <RemoveButton props={{ light }} />}

            {(currPage == 'catalog' || currPage == 'marketplace') 
              && boughtItem
              && <p>Light added to your cart</p>
            }

            {(currPage == 'catalog' || currPage == 'marketplace')
              && !boughtItem 
              && <BuyButton props={{light, userId, setBoughtItem, navigate}}/>
            }
            
          </div>
        </div>
      )}
    </div>
  );
}

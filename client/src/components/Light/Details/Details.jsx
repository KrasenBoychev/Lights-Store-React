/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

import {
  useLightDetails,
  useBoughtLight,
} from '../../../hooks/useLightDetails';

import './Details.css';

import ProfileButtons from './Buttons/ProfileButtons';
import BuyButton from './Buttons/BuyButton';
import RemoveButton from './Buttons/RemoveButton';

import Spinner from '../../Spinner';
import { formatDate } from '../../../common/dateFormatter';

export default function Details() {
  const navigate = useNavigate();

  const [light, setLights, spinner, setSpinner, currPage] = useLightDetails();

  const [boughtItem, setBoughtItem] = useBoughtLight(light._id);

  const { date, month, year } = formatDate(light.date);

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
                Dimensions: {!light.maxHeight && `H${light.height} x `}W{light.width} x D{light.depth} cm.
              </li>

              {light.maxHeight && (
                <li>
                  Adjustable height - Drop between {light.height} to{' '}
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

              {currPage != 'catalog' && light.notes && <li>Notes: {light.notes}</li>}

              {currPage != 'catalog' && light.date && <li>Date of purchase: {date} {month} {year}</li>}
            </ul>
          </div>

          <div className="item-details-button">
            {currPage == 'profile' && (
              <ProfileButtons props={{ light, setSpinner, navigate }} />
            )}

            {currPage == 'cart' && <RemoveButton props={{ light }} />}

            {(currPage == 'catalog' || currPage == 'marketplace') &&
              boughtItem && <p>Light added to your cart</p>}

            {(currPage == 'catalog' || currPage == 'marketplace') &&
              !boughtItem && (
                <BuyButton props={{ light, setBoughtItem, navigate }} />
              )}
          </div>
        </div>
      )}
    </div>
  );
}

/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  addToCart,
  deleteRecord,
  getCart,
  getLightById,
} from '../../../../api/data';
import Spinner from '../../Spinner';
import './Details.css';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useLightDetails, useBoughtLight } from '../../../hooks/useLightDetails';

export default function Details() {
  const navigate = useNavigate();
  const { userId } = useAuthContext();

  const [light, setLights, spinner, setSpinner, currPage] = useLightDetails();

  let height;
  let width;
  let depth;
  if (light.dimensions) {
    [height, width, depth] = light.dimensions.split('/');
  }

  const [boughtItem, setBoughtItem] = useBoughtLight(userId, light._id);

  const buyClickHandler = async () => {

    if (!userId) {
      navigate('/login');
      return;
    }

    try {
      await addToCart(light._id);
    } catch (error) {
      alert(error.message);
    }

    setBoughtItem(true);
  };

  const deleteClickHandler = async () => {
    const confirm = window.confirm('Are you sure');

    if (confirm) {
      try {
        setSpinner(true);
        await deleteRecord(light._id);
        navigate('/profile');
      } catch (error) {
        alert(error.message);
      } finally {
        setSpinner(false);
      }
    }
  };

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
              {light.minHeight ? (
                <li>
                  Adjustable height - Drop between {light.minHeight} to{' '}
                  {light.maxHeight} cm.s
                </li>
              ) : (
                ''
              )}
              {light.kelvins ? (
                <>
                  <li>Integrated LED</li>
                  <li>{light.kelvins} Kelvins</li>
                  <li>{light.lumens} Lumens</li>
                  <li>{light.watt} Watts</li>
                </>
              ) : (
                ''
              )}
              {light.bulbType ? (
                <>
                  <li>Bulb Type: {light.bulbType}</li>
                  <li>Bulbs Required: {light.bulbsRequired}</li>
                </>
              ) : (
                ''
              )}
              {currPage != 'catalog' ? (
                light.notes ? (
                  <li>Notes: {light.notes}</li>
                ) : (
                  ''
                )
              ) : (
                ''
              )}
              {currPage != 'catalog' ? (
                <li>Date of purchase: {light.date}</li>
              ) : (
                ''
              )}
            </ul>
          </div>

          <div className="item-details-button">
            {currPage == 'profile' ? (
              <>
                <Link to={'/edit/' + light._id} state={{ light }}>
                  <button>Edit</button>
                </Link>
                <button
                  onClick={() => {
                    deleteClickHandler();
                  }}
                >
                  Delete
                </button>
              </>
            ) : boughtItem ? (
              <p>Light added to your cart</p>
            ) : (
              <button onClick={buyClickHandler}>Buy</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

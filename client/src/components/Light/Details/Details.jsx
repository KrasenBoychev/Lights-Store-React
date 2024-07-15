/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { deleteRecord } from '../../../../api/data';
import Spinner from '../../Spinner';
import './Details.css';

export default function Details() {
  const navigate = useNavigate();
  const location = useLocation();

  const { light } = location.state;

  const currPage = location.pathname.split('/')[1];
 
  const [height, width, depth] = light.dimensions.split('/');
  
  const [spinner, setSpinner] = useState(false);
  
  const [boughtItem, setBoughtItem] = useState(false);
  const buyClickHandler = () => {
    setBoughtItem(true);
  };

  const deleteClickHandler = async (lightId) => {
    const confirm = window.confirm('Are you sure');

    if (confirm) {
      try {
        setSpinner(true);
        await deleteRecord(lightId);
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
            <p>{light.price.toFixed(2)}lv.</p>
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
              {light.showNotes ? (
                light.notes ? (
                  <li>Notes: {light.notes}</li>
                ) : (
                  ''
                )
              ) : (
                ''
              )}
              {light.showDate ? <li>Date of purchase: {light.date}</li> : ''}
            </ul>
          </div>

          <div className="item-details-button">
            {currPage == 'profile' ? (
              <>
                <Link to={'/edit/' + light._id } state={{ light }}>
                  <button>Edit</button>
                </Link>
                <button
                  onClick={() => {
                    deleteClickHandler(light._id);
                  }}
                >
                  Delete
                </button>
              </>
            ) : (
              boughtItem 
                  ? <p>Light added to your cart</p>
                  : <button onClick={buyClickHandler}>Buy</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

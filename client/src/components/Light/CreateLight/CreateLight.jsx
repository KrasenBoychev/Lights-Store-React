/* eslint-disable react/prop-types */
import { useState } from 'react';
import { createRecord } from '../../../../api/data';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import Adjustable from './parts/Adjustable';
import IntegratedLed from './parts/IntegratedLed';
import BulbTypeLight from './parts/BulbTypeLight';
import Spinner from '../../Spinner';
import './CreateLight.css';
import { useNavigate } from 'react-router-dom';

export default function CreateLight({ spinnerValues }) {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [quantities, setQuantities] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [notes, setNotes] = useState('');

  const [adjustable, setAdjustable] = useState(false);
  const [minHeight, setMinHeight] = useState('');
  const [maxHeight, setMaxHeight] = useState('');

  const adjustableOptionHandler = (e) => {
    const value = e.target.value;

    if (value == 'yes') {
      setAdjustable(true);
    } else {
      setAdjustable(false);
    }
  };

  const [integratedLed, setIntegratedLed] = useState(null);
  const [kelvins, setKelvins] = useState('');
  const [lumens, setLumens] = useState('');
  const [watt, setWatt] = useState('');
  const [bulbType, setBulbType] = useState('');
  const [bulbsRequired, setBulbsRequired] = useState('');

  const integratedLedValues = {kelvins, setKelvins, lumens, setLumens, watt, setWatt};
  const bulbTypeLightValues = {bulbType, setBulbType, bulbsRequired, setBulbsRequired};

  const integratedLedOptionHandler = (e) => {
    const value = e.target.value;

    if (value == 'yes') {
      setIntegratedLed(true);
    } else {
      setIntegratedLed(false);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    let data = {};

    if (name == '' || price == '' || quantities == '' || imageURL == '') {
      alert('All mandatory fields required!');
      return;
    } 

    data = { name, price, quantities };

    const currDate = new Date();
    const dateProvided = new Date(date);

    if (currDate <= dateProvided) {
      alert('Date is not valid!');
      return;
    } else {
      data.date = date;
    }

    const result = dimensions.match(/^\d+\/\d+\/\d+$/);
    if (!result) {
      alert('Dimensions is not valid!');
      return;
    } else {
      data.dimensions = dimensions;
    }

    if (adjustable == true) {
      if (minHeight == '' || maxHeight == '') {
        alert('Min and Max fields Required!');
        return;
      } else {
        data.minHeight = minHeight;
        data.maxHeight = maxHeight;
      }
    } 

    if (integratedLed == null) {
      alert('Integrated LED Required!');
      return;
    } else if (integratedLed == true) {
      if (kelvins == '' || lumens == '' || watt == '') {
        alert('Integrated LED info required!');
        return;
      }
      data.kelvins = kelvins;
      data.lumens = lumens;
      data.watt = watt;
    } else {
      if(bulbType == '' || bulbsRequired == '') {
        alert('Bulb Type Light info is required!');
        return;
      }
      data.bulbType = bulbType;
      data.bulbsRequired = bulbsRequired;
    }

    if (notes != '') {
      if (notes.length > 40) {
        alert('Notes should be maximum 40 symbols!');
        return;
      }
      data.notes = notes;
    }

    try {
      spinnerValues.setSpinner(true);

      const imageRef = ref(storage, `images/${imageURL.name + v4()}`);
      await uploadBytes(imageRef, imageURL);
      const downloadURL = await getDownloadURL(imageRef);

      data.downloadURL = downloadURL;

      await createRecord(data);
      navigate('/marketplace');

    } catch (err) {
      alert(err.message);
    } finally {
        spinnerValues.setSpinner(false);
    }
  };
  return (
    <div className="create_section">
      <h1>Add your light</h1>
    {spinnerValues.spinner ? <Spinner /> 
      : <div className="create-wrapper">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Sale Price:
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        <label>
          Date of Purchase:
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label>
          Quantities:
          <input
            type="number"
            name="quantities"
            value={quantities}
            onChange={(e) => setQuantities(e.target.value)}
          />
        </label>

        <label>
          Dimensions(cm):
          <input
            type="text"
            name="dimensions"
            placeholder="H/W/D"
            value={dimensions}
            onChange={(e) => setDimensions(e.target.value)}
          />
        </label>

        <label>
          Upload Image:
          <input
            type="file"
            name="image"
            onChange={(e) => setImageURL(e.target.files[0])}
          />
        </label>

        <p>
          Is Adjustable?
          <label>
            <input
              type="radio"
              name="adjustable"
              value="yes"
              onChange={adjustableOptionHandler}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="adjustable"
              value="no"
              defaultChecked
              onChange={adjustableOptionHandler}
            />
            No
          </label>
        </p>

        {adjustable && (
          <Adjustable
              values={{ minHeight, setMinHeight, maxHeight, setMaxHeight }}
          />
        )}

        <p>
          Is Integrated LED?
          <label>
            <input
              type="radio"
              name="integrated"
              value="yes"
              onChange={integratedLedOptionHandler}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="integrated"
              value="no"
              onChange={integratedLedOptionHandler}
            />
            No
          </label>
        </p>

        {integratedLed == null ? '' : integratedLed == true ? <IntegratedLed values={integratedLedValues}/> : <BulbTypeLight values={bulbTypeLightValues}/>}

        <label>
          Notes: <textarea name="notes" maxLength={40} placeholder="40 symbols maximum" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
        </label>
        <button type="submit" onClick={handleOnSubmit}>
          Add
        </button>
      </div> 
    }
    </div> 
  );
}
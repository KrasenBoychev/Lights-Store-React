/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecord } from '../../../../api/data';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import Adjustable from './parts/Adjustable';
import IntegratedLed from './parts/IntegratedLed';
import BulbTypeLight from './parts/BulbTypeLight';
import Spinner from '../../Spinner';
import './CreateLight.css';

export default function CreateLight(light) {
  const navigate = useNavigate();

  const [spinner, setSpinner] = useState(false);

  const [formValues, setFormValues] = useState({
    name: light.name || '',
    price: '',
    date: '',
    quantities: '',
    dimensions: '',
    imageURL: '',
    notes: '',
    minHeight: '',
    maxHeight: '',
    kelvins: '',
    lumens: '',
    watt: '',
    bulbType: '',
    bulbsRequired: '',
  });

  const [adjustable, setAdjustable] = useState(false);
  const adjustableOptionHandler = (e) => {
    const value = e.target.value;

    if (value == 'yes') {
      setAdjustable(true);
    } else {
      setAdjustable(false);
    }
  };

  const [integratedLed, setIntegratedLed] = useState(null);
  const integratedLedOptionHandler = (e) => {
    const value = e.target.value;

    if (value == 'yes') {
      setIntegratedLed(true);
    } else {
      setIntegratedLed(false);
    }
  };

  const changeHandler = async (e) => {
    setFormValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.type === 'file'
        ? e.target.files[0]
        : e.target.value,
    }));
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const {name, price, quantities, imageURL} = formValues;

    if (name == '' || price == '' || quantities == '' || imageURL == '') {
      alert('All mandatory fields required!');
      return;
    }

    let data = { name, price, quantities };

    const currDate = new Date();
    const dateProvided = new Date(formValues.date);

    if (currDate <= dateProvided) {
      alert('Date is not valid!');
      return;
    } else {
      data.date = formValues.date;
    }

    const result = formValues.dimensions.match(/^\d+\/\d+\/\d+$/);
    if (!result) {
      alert('Dimensions is not valid!');
      return;
    } else {
      data.dimensions = formValues.dimensions;
    }

    if (adjustable == true) {
      if (formValues.minHeight == '' || formValues.maxHeight == '') {
        alert('Min and Max fields Required!');
        return;
      } else {
        data.minHeight = formValues.minHeight;
        data.maxHeight = formValues.maxHeight;
      }
    }

    if (integratedLed == null) {
      alert('Integrated LED Required!');
      return;
    } else if (integratedLed == true) {
      if (formValues.kelvins == '' || formValues.lumens == '' || formValues.watt == '') {
        alert('Integrated LED info required!');
        return;
      }
      data.kelvins = formValues.kelvins;
      data.lumens = formValues.lumens;
      data.watt = formValues.watt;
    } else {
      if (formValues.bulbType == '' || formValues.bulbsRequired == '') {
        alert('Bulb Type Light info is required!');
        return;
      }
      data.bulbType = formValues.bulbType;
      data.bulbsRequired = formValues.bulbsRequired;
    }

    if (formValues.notes != '') {
      if (formValues.notes.length > 40) {
        alert('Notes should be maximum 40 symbols!');
        return;
      }
      data.notes = formValues.notes;
    }

    try {
      setSpinner(true);

      const imageRef = ref(storage, `images/${imageURL.name + v4()}`);
      await uploadBytes(imageRef, imageURL);
      const downloadURL = await getDownloadURL(imageRef);

      data.downloadURL = downloadURL;

      await createRecord(data);
      navigate('/marketplace');
    } catch (err) {
      alert(err.message);
    } finally {
      setSpinner(false);
    }
  };
  return (
    <div className="create_section">
      <h1>Add your light</h1>
      {spinner ? (
        <Spinner />
      ) : (
        <form onSubmit={formSubmitHandler}>
          <div className="create-wrapper">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={changeHandler}
              />
            </label>

            <label>
              Sale Price:
              <input
                type="number"
                name="price"
                value={formValues.price}
                onChange={changeHandler}
              />
            </label>

            <label>
              Date of Purchase:
              <input
                type="date"
                name="date"
                value={formValues.date}
                onChange={changeHandler}
              />
            </label>

            <label>
              Quantities:
              <input
                type="number"
                name="quantities"
                value={formValues.quantities}
                onChange={changeHandler}
              />
            </label>

            <label>
              Dimensions(cm):
              <input
                type="text"
                name="dimensions"
                placeholder="H/W/D"
                value={formValues.dimensions}
                onChange={changeHandler}
              />
            </label>

            <label>
              Upload Image:
              <input
                type="file" 
                name="imageURL" 
                accept="image/png, image/jpeg"
                onChange={changeHandler}
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

            {adjustable && 
              <Adjustable values={formValues} changeHandler={changeHandler} />
            }

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

            {integratedLed == null ? (
              ''
            ) : integratedLed == true ? (
              <IntegratedLed values={formValues} changeHandler={changeHandler}/>
            ) : (
              <BulbTypeLight values={formValues} changeHandler={changeHandler}/>
            )}

            <label>
              Notes:{' '}
              <textarea
                name="notes"
                maxLength={40}
                placeholder="40 symbols maximum"
                value={formValues.notes}
                onChange={changeHandler}
              ></textarea>
            </label>
            <button type="submit">
              Add
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createRecord, editRecord } from '../../../../api/data';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import Adjustable from './parts/Adjustable';
import IntegratedLed from './parts/IntegratedLed';
import BulbTypeLight from './parts/BulbTypeLight';
import Spinner from '../../Spinner';
import './CreateLight.css';

export default function CreateLight() {
  const [spinner, setSpinner] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const currPage = location.pathname.split('/')[1];

  let light = null;
  if (location.state) {
    light = location.state.light;
  }
  
  const [formValues, setFormValues] = useState({
    name: light ? light.name ? light.name : '' : '',
    price: light ? light.price ? light.price : '' : '',
    date: light ? light.date ? light.date : '' : '',
    quantities: light ? light.quantities ? light.quantities : '' : '',
    dimensions: light ? light.dimensions ? light.dimensions : '' : '',
    imageURL: '',
    notes: light ? light.notes ? light.notes : '' : '',
    minHeight: light ? light.minHeight ? light.minHeight : '' : '',
    maxHeight: light ? light.maxHeight ? light.maxHeight : '' : '',
    kelvins: light ? light.kelvins ? light.kelvins : '' : '',
    lumens: light ? light.lumens ? light.lumens : '' : '',
    watt: light ? light.watt ? light.watt : '' : '',
    bulbType: light ? light.bulbType ? light.bulbType : '' : '',
    bulbsRequired: light ? light.bulbsRequired ? light.bulbsRequired : '' : '',
  });

  let adjustableStateValue;
  if (formValues.minHeight) {
    adjustableStateValue = true;
  } else {
    adjustableStateValue = false;
  }

  const [adjustable, setAdjustable] = useState(adjustableStateValue);

  const adjustableOptionHandler = (e) => {
    const value = e.target.value;

    if (value == 'yes') {
      setAdjustable(true);
    } else {
      setAdjustable(false);
    }
  };

  let integratedLedStateValue;
  if (formValues.kelvins) {
    integratedLedStateValue = true;
  } else if (formValues.bulbType) {
    integratedLedStateValue = false;
  } else {
    integratedLedStateValue = null;
  }
  const [integratedLed, setIntegratedLed] = useState(integratedLedStateValue);

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

    const {name, price, quantities} = formValues;

    if (name == '' || price == '' || quantities == '') {
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

    if (!light && formValues.imageURL == '') {
      alert('Image is required');
      return;
    }

    if (adjustable == true) {
      if (formValues.minHeight == '' || formValues.maxHeight == '') {
        alert('Min and Max fields Required!');
        return;
      } else {
        data.minHeight = formValues.minHeight;
        data.maxHeight = formValues.maxHeight;
      }
    } else {
      data.minHeight = '';
      data.maxHeight = '';
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

      data.bulbType = '';
      data.bulbsRequired = '';
    } else {
      if (formValues.bulbType == '' || formValues.bulbsRequired == '') {
        alert('Bulb Type Light info is required!');
        return;
      }
      data.bulbType = formValues.bulbType;
      data.bulbsRequired = formValues.bulbsRequired;

      data.kelvins = '';
      data.lumens = '';
      data.watt = '';
    }

    if (formValues.notes != '') {
      if (formValues.notes.length > 30) {
        alert('Notes should be maximum 30 symbols!');
        return;
      }
      data.notes = formValues.notes;
    }

    try {
      setSpinner(true);

      if (light && formValues.imageURL == '') {
        data.downloadURL = light.imageURL;
      } else {
        const imageRef = ref(storage, `images/${formValues.imageURL.name + v4()}`);
        await uploadBytes(imageRef, formValues.imageURL);
        const downloadURL = await getDownloadURL(imageRef);
        data.downloadURL = downloadURL;
      }

      if (currPage == 'createlight') {
        await createRecord(data);
        navigate('/profile');
      } else if (currPage == 'edit') {
        await editRecord(light._id, data);
        navigate('/profile/'+ light._id);
      } else {
        return;
      }

    } catch (err) {
      alert(err.message);
    } finally {
      setSpinner(false);
    }

    // if (currPage == 'createlight') {
    //     navigate('/profile');
    // } else if (currPage == 'edit') {
    //     navigate('/profile/'+ light._id);
    // }

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
                  defaultChecked={adjustable}
                  onChange={adjustableOptionHandler}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="adjustable"
                  value="no"
                  defaultChecked={!adjustable}
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
                  defaultChecked={integratedLed}
                  onChange={integratedLedOptionHandler}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="integrated"
                  value="no"
                  defaultChecked={integratedLed == null ? false : !integratedLed}
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
                maxLength={30}
                placeholder="30 symbols maximum"
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

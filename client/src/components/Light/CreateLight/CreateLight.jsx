/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

import { createRecord, editRecord } from '../../../../api/lights-api';
import { uploadImage } from '../../../services/firebase/uploadImage';

import { useForm } from '../../../hooks/useForm';
import { useOneLight } from '../../../hooks/useOneLight';

import './CreateLight.css';

import validateCreateLightForm from '../../../formsValidation/validateCreateLight';

import Adjustable from './chunks/Adjustable';
import IntegratedLed from './chunks/IntegratedLed';
import BulbTypeLight from './chunks/BulbTypeLight';

import Spinner from '../../Spinner';

export default function CreateLight() {
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currPage = location.pathname.split('/')[1];

  const [errors, setErrors] = useState({});

  const [adjustable, setAdjustable] = useState(null);
  const [integratedLed, setIntegratedLed] = useState(null);

  const [light] = useOneLight(location, setAdjustable, setIntegratedLed);

  const createSubmitHandler = async (data) => {
    const allErrors = validateCreateLightForm(
      data,
      light,
      adjustable,
      integratedLed
    );

    if (Object.entries(allErrors).length > 0) {
      setErrors(allErrors);
      return;
    }

    try {
      setSpinner(true);

      if (currPage == 'createlight') {

        const downloadURL = await uploadImage(data.imageURL, 'lightsImages');
        data.downloadURL = downloadURL;

        await createRecord(data);
        navigate('/profile');

      } else if (currPage == 'edit') {

        if (data.imageURL.type == 'image/jpeg') {
          const downloadURL = await uploadImage(data.imageURL);
          data.downloadURL = downloadURL;
        } else {
          data.downloadURL = data.imageURL;
        }

        await editRecord(data._id, data);
        navigate('/profile/' + data._id);

      } else {
        return;
      }

    } catch (error) {
      toast.error(error.message);

    } finally {
      setSpinner(false);
    }
  };

  const { values, changeHandler, submitHandler } = useForm(
    light,
    createSubmitHandler,
    setErrors
  );

  const adjustableOptionHandler = (e) => {
    const value = e.target.value;

    if (value == 'yes') {
      setAdjustable(true);
    } else {
      setAdjustable(false);
    }
  };

  const integratedLedOptionHandler = (e) => {
    const value = e.target.value;

    if (value == 'yes') {
      setIntegratedLed(true);
    } else {
      setIntegratedLed(false);
    }
  };

  return (
    <div className="create_section">
      <h1>{currPage == 'createlight' ? 'Add your light' : 'Edit Light'}</h1>
      {spinner ? (
        <Spinner />
      ) : (
        <form onSubmit={submitHandler}>
          <div className="create-wrapper">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={changeHandler}
              />
              {errors.name && <p className="form-errors">{errors.name}</p>}
            </label>

            <label>
              Sale Price:
              <input
                type="number"
                name="price"
                value={values.price}
                onChange={changeHandler}
              />
              {errors.price && <p className="form-errors">{errors.price}</p>}
            </label>

            <label>
              Date of Purchase:
              <input
                type="date"
                name="date"
                value={values.date}
                onChange={changeHandler}
              />
              {errors.date && <p className="form-errors">{errors.date}</p>}
            </label>

            <label>
              Quantities:
              <input
                type="number"
                name="quantities"
                value={values.quantities}
                onChange={changeHandler}
              />
              {errors.quantities && (
                <p className="form-errors">{errors.quantities}</p>
              )}
            </label>

            <label>
              Dimensions(cm):
              <input
                type="text"
                name="dimensions"
                placeholder="H/W/D"
                value={values.dimensions}
                onChange={changeHandler}
              />
              {errors.dimensions && (
                <p className="form-errors">{errors.dimensions}</p>
              )}
            </label>

            <label>
              Upload Image:
              <input
                type="file"
                name="imageURL"
                accept="image/png, image/jpeg"
                onChange={changeHandler}
              />
              {errors.imageURL && (
                <p className="form-errors">{errors.imageURL}</p>
              )}
            </label>

            <p>
              Is Adjustable?
              <label>
                <input
                  type="radio"
                  name="adjustable"
                  value="yes"
                  checked={adjustable == null ? false : adjustable}
                  onChange={adjustableOptionHandler}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="adjustable"
                  value="no"
                  checked={adjustable ? false : true}
                  onChange={adjustableOptionHandler}
                />
                No
              </label>
            </p>

            {adjustable && (
              <Adjustable props={{ values, errors, changeHandler }} />
            )}

            <p>
              Is Integrated LED?
              <label>
                <input
                  type="radio"
                  name="integrated"
                  value="yes"
                  checked={integratedLed == null ? false : integratedLed}
                  onChange={integratedLedOptionHandler}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="integrated"
                  value="no"
                  checked={integratedLed == null ? false : !integratedLed}
                  onChange={integratedLedOptionHandler}
                />
                No
              </label>
            </p>
            {errors.integratedLed && (
              <p className="form-errors">{errors.integratedLed}</p>
            )}

            {integratedLed == null ? (
              ''
            ) : integratedLed == true ? (
              <IntegratedLed props={{ values, errors, changeHandler }} />
            ) : (
              <BulbTypeLight props={{ values, errors, changeHandler }} />
            )}

            <label>
              Notes:
              <textarea
                name="notes"
                maxLength={30}
                placeholder="30 symbols maximum"
                value={values.notes}
                onChange={changeHandler}
              ></textarea>
              {errors.notes && <p className="form-errors">{errors.notes}</p>}
            </label>
            <button type="submit">Add</button>
          </div>
        </form>
      )}
    </div>
  );
}

/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { editRecord } from '../../../../api/data';
import Adjustable from './chunks/Adjustable';
import IntegratedLed from './chunks/IntegratedLed';
import BulbTypeLight from './chunks/BulbTypeLight';
import Spinner from '../../Spinner';
import './CreateLight.css';
import { useCreateLight } from '../../../hooks/useCreateLight';
import toast from 'react-hot-toast';
import validateCreateLightForm from '../../../formsValidation/validateCreateLight';
import { useForm } from '../../../hooks/useForm';
import { uploadImage } from '../../../services/firebase/uploadImage';

const initialValues = {
  name: '',
  price: '',
  date: '',
  quantities: '',
  dimensions:'',
  imageURL: '',
  notes: '',
  minHeight: '',
  maxHeight: '',
  kelvins: '',
  lumens:'',
  watt: '',
  bulbType: '',
  bulbsRequired: ''
};

export default function CreateLight() {
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currPage = location.pathname.split('/')[1];

  const createLightRequest = useCreateLight();
  const [errors, setErrors] = useState({});

  let light = null;
  if (location.state) {
    light = location.state.light;
  }

  const createSubmitHandler = async (data) => {

    const allErrors = validateCreateLightForm(data, light, adjustable, integratedLed);

    if (Object.entries(allErrors).length > 0) {
      setErrors(allErrors);
      return;
    }

    try {
      setSpinner(true);

      if (currPage == 'createlight') {
        const downloadURL = await uploadImage(data.imageURL);
        data.downloadURL = downloadURL;

        await createLightRequest(data);
        navigate('/profile');

      } else if (currPage == 'edit') {
        if (data.imageURL == '') {
          data.downloadURL = data.imageURL;
        }

        await editRecord(data._id, data);
        navigate('/profile/'+ data._id);

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
    initialValues,
    createSubmitHandler,
    setErrors
  );


  //TODO: try to move the bottom code to external file(s)

  let adjustableStateValue;
  if (values.minHeight) {
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
  if (values.kelvins) {
    integratedLedStateValue = true;
  } else if (values.bulbType) {
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

  return (
    <div className="create_section">
      <h1>Add your light</h1>
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
              {errors.name && <p className='form-errors'>{errors.name}</p>}
            </label>

            <label>
              Sale Price:
              <input
                type="number"
                name="price"
                value={values.price}
                onChange={changeHandler}
              />
               {errors.price && <p className='form-errors'>{errors.price}</p>}
            </label>

            <label>
              Date of Purchase:
              <input
                type="date"
                name="date"
                value={values.date}
                onChange={changeHandler}
              />
              {errors.date && <p className='form-errors'>{errors.date}</p>}
            </label>

            <label>
              Quantities:
              <input
                type="number"
                name="quantities"
                value={values.quantities}
                onChange={changeHandler}
              />
               {errors.quantities && <p className='form-errors'>{errors.quantities}</p>}
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
               {errors.dimensions && <p className='form-errors'>{errors.dimensions}</p>}
            </label>

            <label>
              Upload Image:
              <input
                type="file" 
                name="imageURL" 
                accept="image/png, image/jpeg"
                onChange={changeHandler}
              />
               {errors.imageURL && <p className='form-errors'>{errors.imageURL}</p>}
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
              <Adjustable props={{values, errors, changeHandler}} />
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
              {errors.integratedLed && <p className='form-errors'>{errors.integratedLed}</p>}
            </p>

            {integratedLed == null ? (
              ''
            ) : integratedLed == true ? (
              <IntegratedLed props={{values, errors, changeHandler}}/>
            ) : (
              <BulbTypeLight props={{values, errors, changeHandler}}/>
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
              {errors.notes && <p className='form-errors'>{errors.notes}</p>}
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



 // const [formValues, setFormValues] = useState({
  //   name: light ? light.name ? light.name : '' : '',
  //   price: light ? light.price ? light.price : '' : '',
  //   date: light ? light.date ? light.date : '' : '',
  //   quantities: light ? light.quantities ? light.quantities : '' : '',
  //   dimensions: light ? light.dimensions ? light.dimensions : '' : '',
  //   imageURL: '',
  //   notes: light ? light.notes ? light.notes : '' : '',
  //   minHeight: light ? light.minHeight ? light.minHeight : '' : '',
  //   maxHeight: light ? light.maxHeight ? light.maxHeight : '' : '',
  //   kelvins: light ? light.kelvins ? light.kelvins : '' : '',
  //   lumens: light ? light.lumens ? light.lumens : '' : '',
  //   watt: light ? light.watt ? light.watt : '' : '',
  //   bulbType: light ? light.bulbType ? light.bulbType : '' : '',
  //   bulbsRequired: light ? light.bulbsRequired ? light.bulbsRequired : '' : '',
  // });
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

import { createRecord, editRecord } from '../../../../api/lights-api';
import { deleteImage, uploadImage } from '../../../services/firebase/requester-firebase';

import { useForm } from '../../../hooks/useForm';
import { useOneLight } from '../../../hooks/useOneLight';

import './CreateLight.css';

import validateCreateLightForm from '../../../formsValidation/validateCreateLight';

import MainFields from './chunks/mainFields/MainFields';
import Dimensions from './chunks/dimensions/Dimensions';
import IntegratedLed from './chunks/isIntegratedLed/IntegratedLed';
import ImageLight from './chunks/image/ImageLight';

import Spinner from '../../Spinner';
import Notes from './chunks/notes/Notes';

export default function CreateLight() {
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currPage = location.pathname.split('/')[1];

  const [errors, setErrors] = useState({});

  const [adjustable, setAdjustable] = useState(null);
  const [integratedLed, setIntegratedLed] = useState(null);
  const [bulbTypeState, setBulbTypeState] = useState('E27');

  const [light] = useOneLight(location, setAdjustable, setIntegratedLed, setBulbTypeState);

  const createSubmitHandler = async (data) => {
    const allErrors = validateCreateLightForm(
      data,
      light,
      adjustable,
      integratedLed,
      bulbTypeState
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

        if (data.imageURL.type == 'image/jpeg' || data.imageURL.type == 'image/png') {
          await deleteImage(light);

          const downloadURL = await uploadImage(data.imageURL, 'lightsImages');
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
      const errorList = JSON.parse(error.message);
      
      if (!Array.isArray(errorList)) {
        setErrors(errorList);
      } else {
        toast.error(errorList[0]);
      }
      
    } finally {
      setSpinner(false);
    }
  };

  const { values, changeHandler, submitHandler } = useForm(
    light,
    createSubmitHandler,
    setErrors
  );

  return (
    <div className="create_section">
      <h1>{currPage == 'createlight' ? 'Add your light' : 'Edit Light'}</h1>
      {spinner ? (
        <Spinner />
      ) : (
        <form onSubmit={submitHandler}>
          <div className="create-wrapper">
              <MainFields props={{ values, changeHandler, errors }} />
              <Dimensions props={{ adjustable, setAdjustable, values, errors, changeHandler }}/>
              <IntegratedLed props={{ values, errors, changeHandler, integratedLed, setIntegratedLed, bulbTypeState, setBulbTypeState }}/>
              <Notes props={{ values, changeHandler, errors }} />
              <ImageLight props={{ changeHandler, errors }}/>

              <button type="submit">{currPage == 'createlight' ? 'Add' : 'Edit'}</button>
          </div>
        </form>
      )}
    </div>
  );
}

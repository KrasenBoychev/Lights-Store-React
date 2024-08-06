/* eslint-disable react/prop-types */
import toast from 'react-hot-toast';

import { deleteRecord } from '../../../../../api/lights-api';

export default function DeleteLight({ props }) {
  const { light, setSpinner, navigate, setDeletePopUp } = props;

  const deleteClickHandler = async () => {

    try {
      setSpinner(true);
      await deleteRecord(light._id);
      navigate('/profile');

    } catch (error) {
      toast(error.message);
      
    } finally {
      setSpinner(false);
    }
  };

  const cancelClickHandler = () => {
    setDeletePopUp(false);
  };

  return (
    <div className="delete-wrapper">
      <div className="delete-question">
        <p>Are you sure you want to delete {light.name}?</p>
      </div>
      <div className="delete-buttons">
        <button onClick={() => deleteClickHandler()}>Yes, sure</button>
        <button onClick={() => cancelClickHandler()}>Cancel</button>
      </div>
    </div>
  );
}

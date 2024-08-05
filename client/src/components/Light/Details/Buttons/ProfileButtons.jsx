/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import DeleteLight from './DeleteLight';
import { useState } from 'react';
//import { deleteRecord } from '../../../../../api/data';

export default function ProfileButtons({props}) {
  const {light, setSpinner, navigate} = props;

  const [deletePopUp, setDeletePopUp] = useState(false);

  const deleteClickHandler = () => {
    setDeletePopUp(true);
  };

    
  // const deleteClickHandler = async () => {
  //   const confirm = window.confirm('Are you sure');

  //   if (confirm) {
  //     try {
  //       setSpinner(true);
  //       await deleteRecord(light._id);
  //       navigate('/profile');
  //     } catch (error) {
  //       alert(error.message);
  //     } finally {
  //       setSpinner(false);
  //     }
  //   }
  // };

  return (
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

      {deletePopUp && <DeleteLight />}
    </>
  );
}

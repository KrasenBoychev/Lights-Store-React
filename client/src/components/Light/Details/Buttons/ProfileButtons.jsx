/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link } from 'react-router-dom';

import DeleteLight from './DeleteLight';

export default function ProfileButtons({ props }) {
  const { light, setSpinner, navigate } = props;

  const [deletePopUp, setDeletePopUp] = useState(false);

  const showPopUpHandler = () => {
    setDeletePopUp(true);
  };

  return (
    <>
      <Link to={'/edit/' + light._id} state={{ light }}>
        <button>Edit</button>
      </Link>
      <button
        onClick={() => {
          showPopUpHandler();
        }}
      >
        Delete
      </button>

      {deletePopUp && (
        <DeleteLight props={{ light, setSpinner, navigate, setDeletePopUp }} />
      )}
    </>
  );
}

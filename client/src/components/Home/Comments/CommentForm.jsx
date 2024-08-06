import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { createComment } from '../../../../api/comments-api';
import { useForm } from '../../../hooks/useForm';
import { uploadImage } from '../../../services/firebase/uploadImage';

import validateCommentForm from '../../../formsValidation/validateCommentForm';

import Spinner from '../../Spinner';

const initialValues = {
  name: '',
  customerComment: '',
  imageURL: '',
};

export default function CommentForm() {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [errors, setErrors] = useState({});

  const commentSubmitHandler = async (data) => {
    const allErrors = validateCommentForm(data);

    if (Object.entries(allErrors).length > 0) {
      setErrors(allErrors);
      return;
    }

    try {
      setSpinner(true);

      const downloadURL = await uploadImage(data.imageURL);
      data.downloadURL = downloadURL;

      await createComment(data);

      navigate('/');
    } catch (error) {
      toast(error.message);
    } finally {
      setSpinner(false);
    }
  };

  const { values, changeHandler, submitHandler } = useForm(
    initialValues,
    commentSubmitHandler,
    setErrors
  );

  return (
    <div className="contact_section layout_padding">
      {spinner ? (
        <Spinner />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1 className="contact_text">Your opinion matters</h1>
              <div className="mail_sectin">
                <form onSubmit={submitHandler}>
                  <input
                    type="text"
                    className="name-bt"
                    placeholder="Name"
                    name="name"
                    value={values.name}
                    onChange={changeHandler}
                  />
                  {errors.name && <p className="form-errors">{errors.name}</p>}

                  <textarea
                    className="massage-bt"
                    placeholder="Comment"
                    rows="5"
                    id="comment"
                    name="customerComment"
                    value={values.customerComment}
                    onChange={changeHandler}
                  ></textarea>
                  {errors.customerComment && (
                    <p className="form-errors">{errors.customerComment}</p>
                  )}
                  <label className="image-bt">
                    Your Image:
                    <input
                      type="file"
                      name="imageURL"
                      accept="image/png, image/jpeg"
                      onChange={changeHandler}
                    />
                  </label>
                  {errors.imageURL && (
                    <p className="form-errors">{errors.imageURL}</p>
                  )}
                  <div className="send_bt">
                    <button>SEND</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="image_9">
                <img src="images/lights-comment.jpg" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

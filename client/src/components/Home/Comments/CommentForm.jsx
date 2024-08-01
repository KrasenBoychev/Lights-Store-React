import { useState } from 'react';
import { createComment } from '../../../../api/data';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Spinner';
import { uploadImage } from '../../../services/firebase/uploadImage';

export default function CommentForm() {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);

  const [commentFormValues, setCommentFormValues] = useState({
    name: '',
    customerComment: '',
    imageURL: '',
  });

  const changeHandler = async (e) => {
    setCommentFormValues((oldValues) => ({
      ...oldValues,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files[0] : e.target.value,
    }));
  };

  const commentSubmitHandler = async (e) => {
    e.preventDefault();

    const { name, customerComment, imageURL } = commentFormValues;

    if (name == '' || customerComment == '' || imageURL == '') {
      alert('All fields required!');
      return;
    }

    setSpinner(true);

    const downloadURL = uploadImage(imageURL);

    const data = { name, customerComment, downloadURL };

    try {
      await createComment(data);
    } catch (error) {
      alert(error.message);
      return;
    } finally {
      setSpinner(false);
    }

    navigate('/');
  };
  return (
    <div className="contact_section layout_padding">
      {spinner ? (
      <Spinner />) : (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1 className="contact_text">Your opinion matters</h1>
            <div className="mail_sectin">
              <form onSubmit={commentSubmitHandler}>
                <input
                  type="text"
                  className="name-bt"
                  placeholder="Name"
                  name="name"
                  value={commentFormValues.name}
                  onChange={changeHandler}
                />
                <textarea
                  className="massage-bt"
                  placeholder="Comment"
                  rows="5"
                  id="comment"
                  name="customerComment"
                  value={setCommentFormValues.customerComment}
                  onChange={changeHandler}
                ></textarea>
                <label className="image-bt">
                  Your Image:
                  <input
                    type="file"
                    name="imageURL"
                    accept="image/png, image/jpeg"
                    onChange={changeHandler}
                  />
                </label>
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

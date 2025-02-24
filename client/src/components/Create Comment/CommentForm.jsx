import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createComment } from "../../../api/comments-api";
import { useForm } from "../../hooks/useForm";
import { uploadImage } from "../../services/firebase/requester-firebase";

import validateCommentForm from "../../formsValidation/validateCommentForm";
import Spinner from "../core/Spinner";

import "./commentForm.css";

const initialValues = {
  name: "",
  customerComment: "",
  imageURL: "",
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

      const downloadURL = await uploadImage(data.imageURL, "commentsImages");
      data.downloadURL = downloadURL;

      await createComment(data);

      navigate("/");
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
    initialValues,
    commentSubmitHandler,
    setErrors
  );

  return (
    <div className="create_comment_container">
      {spinner ? (
        <Spinner />
      ) : (
        <div className="create_comment_inner_container">
          <div className="create_comment_form_wrapper">
            <h2>Your opinion matters</h2>
            <form onSubmit={submitHandler} className="create_comment_form">
              <input
                className={
                  errors.name
                    ? "create_comment_form_name create_comment_form_error"
                    : "create_comment_form_name"
                }
                type="text"
                placeholder="Name"
                name="name"
                value={values.name}
                onChange={changeHandler}
              />
              <textarea
                className={
                  errors.customerComment
                    ? "create_comment_form_textarea create_comment_form_error"
                    : "create_comment_form_textarea"
                }
                placeholder="Comment"
                rows="5"
                id="comment"
                name="customerComment"
                value={values.customerComment}
                onChange={changeHandler}
              ></textarea>
              <label className={errors.imageURL && "create_comment_form_error"}>
                Your Image:
                <input
                  type="file"
                  name="imageURL"
                  accept="image/png, image/jpeg"
                  onChange={changeHandler}
                />
              </label>
              <div className="create_comment__form_btn">
                <button>Send</button>
                <p>*all fields must be filled in</p>
              </div>
            </form>
          </div>
          <div className="create_comment_img">
            <div>
              <img src="images/create comment/lights-comment.jpg" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

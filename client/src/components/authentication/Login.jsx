/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import { useLogin } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";

import validateAuthenticationForm from "../../formsValidation/validateAuthenticationForm";

import "./authentication.css";

const initialValues = { email: "", password: "" };

export default function Login() {
  const login = useLogin();
  const navigate = useNavigate();
  const location = useLocation();

  const [errors, setErrors] = useState({});

  const loginHandler = async ({ email, password }) => {
    const allErrors = validateAuthenticationForm(email, password);

    if (Object.entries(allErrors).length > 0) {
      setErrors(allErrors);
      return;
    }

    try {
      await login(email, password);

      if (location.state && location.state.length > 0) {
        navigate(`${location.state}`);
      } else {
        navigate("/");
      }
    } catch (error) {
      return toast.error(error.message);
    }
  };

  const { values, changeHandler, submitHandler } = useForm(
    initialValues,
    loginHandler,
    setErrors
  );

  return (
    <div className="authentication_form_container">
      <div className="authentication_form_wrapper">
        <form
          method="post"
          onSubmit={submitHandler}
          className="authentication_form"
        >
          <h2>Login</h2>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={changeHandler}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={changeHandler}
            />
            {errors.password && <span>{errors.password}</span>}
          </div>

          <button type="submit">Login</button>
        </form>

        <p>
          Do not have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

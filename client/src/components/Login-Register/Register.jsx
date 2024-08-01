/* eslint-disable react/prop-types */
import { useNavigate, Link } from 'react-router-dom';
import './LoginAndRegister.css';
import { useRegister } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import { useState } from 'react';
import toast from 'react-hot-toast';
import validateRegisterForm from '../../formsValidation/validateRegister';

const initialValues = { email: '', password: '', rePass: '' };

export default function Register() {
  const register = useRegister();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const registerHandler = async ({ email, password, rePass }) => {
    const allErrors = validateRegisterForm(email, password, rePass);

    if (Object.entries(allErrors).length > 0) {
      setErrors(allErrors);
      return;
    }

    try {
      await register(email, password);
      navigate('/');
    } catch (error) {
      return toast.error(error.message);
    }
  };

  const { values, changeHandler, submitHandler } = useForm(
    initialValues,
    registerHandler,
    setErrors
  );

  return (
    <div className="login_section">
      <div className="login-form">
        <form method="post" onSubmit={submitHandler}>
          <h2>Register</h2>
          <div className="form-input">
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
          <div className="form-input">
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
          <div className="form-input">
            <input
              type="password"
              id="rePass"
              name="rePass"
              placeholder="Repeat Password"
              value={values.rePass}
              onChange={changeHandler}
            />
            {errors.rePass && <span>{errors.rePass}</span>}
          </div>

          <button type="submit">Register</button>
        </form>

        <p>
          Have an account yet? <Link to="/login">Login here</Link>.
        </p>
      </div>
    </div>
  );
}

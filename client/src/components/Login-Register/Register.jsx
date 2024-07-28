/* eslint-disable react/prop-types */
import { useNavigate, Link } from 'react-router-dom';
import './LoginAndRegister.css';
import { useRegister } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import { useState } from 'react';

const initialValues = { email: '', password: '', rePass: '' };

export default function Register() {
  const [error, setError] = useState({});
  const register = useRegister();
  const navigate = useNavigate();

  const registerHandler = async ({ email, password, rePass }) => {

    if (password != rePass) {
      setError({ rePass: 'Passwords should match!' });
      return;
    }

    await register(email, password);
    navigate('/');
  };

  const { values, changeHandler, submitHandler } = useForm(
    initialValues,
    registerHandler
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
           {error.rePass && <span>Passwords should match!</span>}
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

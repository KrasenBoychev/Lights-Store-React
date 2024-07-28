/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../../api/api';
import './LoginAndRegister.css';

export default function Login(props) {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const { email, password } = formValues;

    const result = await login(email, password);

    if (result) {
      props.setUserNav(true);
      navigate('/');
    }
  };

  return (
    <div className="login_section">
      <div className="login-form">
        <form method="post" onSubmit={formSubmitHandler}>
          <h2>Login</h2>
          <div className="form-input">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={changeHandler}
            />
          </div>
          <div className="form-input">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={changeHandler}
            />
          </div>

          <button type="submit">Login</button>
        </form>

        <p>
          Do not have an account? <Link to="/register">Register here</Link>.
        </p>
      </div>
    </div>
  );
}

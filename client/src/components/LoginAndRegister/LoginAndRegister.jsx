/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, register } from '../../../api/api';
import RePass from './RePass';
import './LoginAndRegister.css';

export default function LoginAndRegister(props) {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    rePass: ''
  });


  const changeHandler = async (e) => {
    setFormValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    let result;

    const {email, password} = formValues;

    if (props.page == 'login') {
        result = await login(email, password);
    } else if (props.page == 'register') {
        result = await register(email, password);
    } else {
        navigate('/');
    }
    
    if (result) {
      props.setUserNav(true);
      navigate('/');
    }
  };

  return (
    <div className="login_section">
      <div className="login-form">
        <form method="post" onSubmit={formSubmitHandler}>
          <h2>{props.page}</h2>
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

          {props.page == 'register' ? <RePass /> : ''}

          <button type="submit">{props.page}</button>
        </form>

        {props.page == 'register' ? (
          <p>
            Have an account yet? <Link to="/login">Login here</Link>.
          </p>
        ) : (
          <p>
            Do not have an account? <Link to="/register">Register here</Link>.
          </p>
        )}
      </div>
    </div>
  );
}

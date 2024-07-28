/* eslint-disable react/prop-types */
import './LoginAndRegister.css';

import { useNavigate, Link } from 'react-router-dom';
import { useLogin } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';

const initialValues = { email: '', password: '' };

export default function Login() {
  const login = useLogin();
  const navigate = useNavigate();

  const loginHandler = async ({ email, password }) => { 
      await login(email, password);
      navigate('/');
  };

  const { values, changeHandler, submitHandler } = useForm(
    initialValues,
    loginHandler
  );

  return (
    <div className="login_section">
      <div className="login-form">
        <form method="post" onSubmit={submitHandler}>
          <h2>Login</h2>
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

          <button type="submit">Login</button>
        </form>

        <p>
          Do not have an account? <Link to="/register">Register here</Link>.
        </p>
      </div>
    </div>
  );
}

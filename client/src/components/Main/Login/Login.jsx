/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../../api/api';
import './Login.css';

export default function Login({ setUserNav }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const result = await login(email, password);
        if (result) {
            setUserNav(true);
            navigate('/');
        }
    };

  return (
    <div className="login_section">
      <div className="login-form">
        <form method="post">
          <h2>Login</h2>
          <div className="form-input">
            <input type="email" id="email" name="email" placeholder="Email" 
            value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="form-input">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" onClick={handleOnSubmit}>Login</button>
        </form>
        <p>
          Do not have an account? <a href="#">Register here</a>.
        </p>
      </div>
    </div>
  );
}

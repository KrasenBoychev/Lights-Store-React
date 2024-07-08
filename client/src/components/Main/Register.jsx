import { useState } from 'react';
import { register } from '../../../api/api';
import './Login/Login.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const result = await register(email, password);
        if (result) {
            alert('Data saved successfully');
            setEmail('');
            setPassword('');
        }
    };

  return (
    <div className="login_section">
      <div className="login-form">
        <form method="post">
          <h2>Register</h2>
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
          <div className="form-input">
            <input
              type="password"
              id="rePass"
              name="rePass"
              placeholder="Repeat password"
            />
          </div>

          <button type="submit" onClick={handleOnSubmit}>Register</button>
        </form>
        <p>
          Have an account yet? <a href="#">Login here</a>.
        </p>
      </div>
    </div>
  );
}

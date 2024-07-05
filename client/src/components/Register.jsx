import './css/Login.css';

export default function Register() {
  return (
    <div className="login_section">
      <div className="login-form">
        <form method="post">
          <h2>Register</h2>
          <div className="form-input">
            <input type="email" id="email" name="email" placeholder="Email" />
          </div>
          <div className="form-input">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
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

          <button type="submit">Register</button>
        </form>
        <p>
          Have an account yet? <a href="#">Login here</a>.
        </p>
      </div>
    </div>
  );
}

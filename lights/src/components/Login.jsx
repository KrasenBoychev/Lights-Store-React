import './Login.css';

export default function Login() {
  return (
    <div className="login_section">
      <div className="login-form">
        <form method="post">
          <h2>Login</h2>
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

          <button type="submit">Login</button>
        </form>
        <p>
          Do not have an account? <a href="#">Register here</a>.
        </p>
      </div>
    </div>
  );
}
